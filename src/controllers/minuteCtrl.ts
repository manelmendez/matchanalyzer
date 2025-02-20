import { Request, Response } from 'express'
import { MinuteService } from '../dao-postgres/minute-service'
import { Minute } from '../models/minute'
import errorHelper from '../utils/errorHelper.js'

export class MinuteController {
  private minuteService: MinuteService
  constructor (minuteService: MinuteService) {
    this.minuteService = minuteService
  }

  addMinute = async (req: Request, res: Response) => {
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
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
      errorHelper.internalServerError('Error al añadir minutos')
    }
  }

  getMinutesByMatchId = async (req: Request, res: Response) => {
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = Number(req.user.id)
    const matchId: number = Number(req.params.matchId)
    try {
      const minutes = await this.minuteService.findByMatch(matchId, userId)
      return res.status(200).send({
        minutes
      })
    } catch (error) {
      console.log(error)
      errorHelper.internalServerError('Error al obtener minutos')
    }
  }

  deleteMinute = async (req: Request, res: Response) => {
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = Number(req.user.id)
    const id: number = Number(req.params.minuteId)
    try {
      const minuteDeleted = await this.minuteService.deleteMinute(id, userId)
      return res.status(200).send({
        minuteDeleted
      })
    } catch (error) {
      console.log(error)
      errorHelper.internalServerError('Error al borrar minutos')
    }
  }
}
