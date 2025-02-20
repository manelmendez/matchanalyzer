import { Request, Response } from 'express'
import { MatchService } from '../dao-postgres/match-service'
import { Match } from '../models/match'
import errorHelper from '../utils/errorHelper.js'

export class MatchController {
  private matchService: MatchService
  constructor (matchService: MatchService) {
    this.matchService = matchService
  }

  getMatch = async (req: Request, res: Response) => {
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = Number(req.user.id)
    const id: number = Number(req.params.id)
    try {
      const match = await this.matchService.findById(id, userId)
      return res.status(200).send({
        match
      })
    } catch (error) {
      console.log(error)
      errorHelper.internalServerError('Error al obtener partido')
    }
  }

  addMatch = async (req: Request, res: Response) => {
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = Number(req.user.id)
    // getting data
    const match: Match = {
      localTeamId: req.body.localTeam,
      localTeamGoals: req.body.localTeamGoals,
      awayTeamId: req.body.awayTeam,
      awayTeamGoals: req.body.awayTeamGoals,
      matchDay: new Date(),
      competitionId: req.body.competition,
      roundId: req.body.round,
      userId
    }
    console.log('Añadiendo partido...')
    try {
      const matchSaved = await this.matchService.saveMatch(match)
      return res.status(200).send({
        match: matchSaved
      })
    } catch (err) {
      console.log(err)
      errorHelper.internalServerError('Error al añadir partido')
    }
  }

  updateMatch = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = Number(req.user.id)
    const match: Match = {
      localTeamId: req.body.localTeam.id,
      localTeamGoals: req.body.localTeamGoals,
      awayTeamId: req.body.awayTeam.id,
      awayTeamGoals: req.body.awayTeamGoals,
      competitionId: req.body.competition,
      roundId: req.body.round,
      userId
    }
    console.log('Actualizar partido')
    try {
      const matchUpdated = await this.matchService.updateMatch(match, id, userId)
      res.status(200).send({ match: matchUpdated })
    } catch (err) {
      console.log(err)
      errorHelper.internalServerError('Error al actualizar el partido')
    }
  }

  deleteMatch = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = Number(req.user.id)
    await this.matchService.deleteMatch(id, userId).then(() => {
      res.status(200).send({ match: id })
    })
      .catch((err) => {
        console.log(err)
        errorHelper.internalServerError('Error al borrar el partido')
      })
  }
}
