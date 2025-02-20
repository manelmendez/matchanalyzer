import { Request, Response } from 'express'
import { AssistService } from '../dao-postgres/assist-service'
import {Assist} from '../models/assist.js'
import errorHelper from '../utils/errorHelper.js'

export class AssistController {
  private assistService: AssistService
  constructor (assistService: AssistService) {
    this.assistService = assistService
  }

  addAssist = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    const assistToSave: Assist = {
      goalId: req.body.goalId,
      type: req.body.type,
      playerId: req.body.playerId,
      matchId: req.body.match,
      matchpartId: req.body.matchpartId,
      roundId: req.body.roundId,
      userId
    }
    try {
      const assistSaved = await this.assistService.saveAssist(assistToSave)
      return res.status(200).send({
        assistSaved
      })
    } catch (error) {
      console.log(error)
      errorHelper.internalServerError('Error al añadir asistencia')
    }
  }

  getAssistsByMatchId = async (req: Request, res: Response) => {
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = req.user.id
    const matchId: number = Number(req.params.matchId)
    try {
      const assists = await this.assistService.findByMatch(matchId, userId)
      return res.status(200).send({
        assists
      })
    } catch (error) {
      console.log(error)
      errorHelper.internalServerError('Error al obtener asistencia')
    }
  }

  deleteAssist = async (req: Request, res: Response) => {
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = req.user.id
    const assistId: number = parseInt(req.params.assistId)
    try {
      const assistDeleted = await this.assistService.deleteAssist(assistId, userId)
      return res.status(200).send({
        assistDeleted
      })
    } catch (error) {
      console.log(error)
      errorHelper.internalServerError('Error al borrar asistencia')
    }
  }
}
