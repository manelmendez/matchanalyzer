import { Request, Response, NextFunction } from 'express'
import { MinuteService } from '../dao-postgres/minute-service'
import { Minute } from '../models/minute'

export class MinuteController {
  private minuteService: MinuteService
  constructor (minuteService: MinuteService) {
    this.minuteService = minuteService
  }

  addMinute = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = Number(req.user.id)
    const minute: Minute = {
      playerId: req.body.playerId,
      position: req.body.position,
      matchpartId: req.body.matchpartId,
      matchId: req.body.matchId,
      roundId: req.body.roundId,
      userId
    }
    try {
      const minuteSaved = await this.minuteService.saveMinute(minute)
      return res.status(200).send({
        minuteSaved
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        message: `Error al añadir partes: ${error}`
      })
    }
  }

  getMinutesByMatchId = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = Number(req.user.id)
    const matchId: number = Number(req.params.matchId)
    try {
      const minutes = await this.minuteService.findByMatch(matchId, userId)
      return res.status(200).send({
        minutes
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al obtener partes: ${error}`
      })
    }
  }

  deleteMinute = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = Number(req.user.id)
    const id: number = Number(req.params.minuteId)
    try {
      const minuteDeleted = await this.minuteService.deleteMinute(id, userId)
      return res.status(200).send({
        minuteDeleted
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al obtener partes: ${error}`
      })
    }
  }
}
