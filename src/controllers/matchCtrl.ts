import { Request, Response } from 'express'
import { MatchService } from '../dao-postgres/match-service'
import { Match } from '../models/match'

export class MatchController {
  private matchService: MatchService
  constructor (matchService: MatchService) {
    this.matchService = matchService
  }

  getMatch = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = Number(req.user.id)
    const id: number = Number(req.params.id)
    try {
      const match = await this.matchService.findById(id, userId)
      return res.status(200).send({
        match
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al obtener match: ${error}`
      })
    }
  }

  addMatch = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
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
      return res.status(500).send({
        message: `Error al crear competición: ${err}`
      })
    }
  }

  updateMatch = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
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
      res.status(500).send({ message: 'Error al actualizar el partido' })
    }
  }

  deleteMatch = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = Number(req.user.id)
    await this.matchService.deleteMatch(id, userId).then(() => {
      res.status(200).send({ match: id })
    })
      .catch((err) => {
        console.log(err)
        res.status(500).send({ message: 'Error al borrar el partido' })
      })
  }
}
