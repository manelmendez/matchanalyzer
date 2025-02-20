import { Request, Response } from 'express'
import { RoundService } from "../dao-postgres/round-service"
import { MatchService } from "../dao-postgres/match-service"
import { TeamService } from "../dao-postgres/team-service"
import { Round } from '../models/round'
import { Team } from '../models/team'
import { Match } from '../models/match'
import errorHelper from '../utils/errorHelper.js'

export class RoundController {
  private roundService: RoundService
  private matchService: MatchService
  private teamService: TeamService

  constructor (roundService: RoundService, matchService: MatchService, teamService: TeamService) {
    this.roundService = roundService
    this.matchService = matchService
    this.teamService = teamService
  }

  addRound = async (req: Request, res: Response) => {
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = req.user.id
    const round = {
      name: req.body.name,
      date: new Date(),
      competitionId: req.body.competitionId,
      userId
    }
    console.log('Registrando competicion con nombre: ' + round.name + '...')
    try {
      const roundSaved = await this.roundService.saveRound(round)
      roundSaved.matches = []
      return res.status(200).send({
        round: roundSaved
      })
    } catch (err) {
      console.log(err)
      errorHelper.internalServerError('Error al añadir round')
    }
  }

  deleteRound = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = req.user.id
    try {
      await this.roundService.deleteRound(id, userId)
      res.status(200).send({ message: 'Jornada borrada' })
    } catch (err) {
      console.log(err)
      errorHelper.internalServerError('Error al borrar round')
    }
  }

  getCompetitionRounds = async (req: Request, res: Response) => {
    console.log('Obtener jornadas de competición con ID: ' + req.params.id)
    const competitionId: number = Number(req.params.id)
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    try {
      const userId: number = req.user.id
      const rounds: Round[] = await this.roundService.findByCompetition(competitionId, userId)
      const matches: Match[] = await this.matchService.findByCompetition(competitionId, userId)
      const teams: Team[] = await this.teamService.findByCompetition(competitionId, userId)
      
      for (let i = 0; i < rounds.length; i++) {
        rounds[i].matches = []
        rounds[i].ranking = []
        for (let j = 0; j < matches.length; j++) {
          for (let k = 0; k < teams.length; k++) {          
            if (matches[j].localTeamId === teams[k].id) {
              matches[j].localTeam = teams[k]
            }
            if (matches[j].awayTeamId === teams[k].id) {
              matches[j].awayTeam = teams[k]
            }
          }
          if (rounds[i].id === matches[j].roundId) {          
            rounds[i].matches?.push(matches[j])          
          }
        }
      }        
      res.status(200).send({
        rounds
      })
    } catch (err) {
      console.log(err)
      errorHelper.internalServerError('Error al obtener datos de round')
    }
    
  }
}
