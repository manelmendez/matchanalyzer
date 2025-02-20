import { Request, Response } from 'express'
import { AssistService } from '../dao-postgres/assist-service'
import { Assist } from '../models/assist.js'
import errorHelper from '../utils/errorHelper.js'

export class AssistController {
  private assistService: AssistService
  constructor(assistService: AssistService) {
    this.assistService = assistService
  }

  addAssist = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return errorHelper.unauthorizedError('No userId provided in Auth')
      }
      const userId: number = req.user?.id as number
      const assistToSave: Assist = {
        goalId: req.body.goalId,
        type: req.body.type,
        playerId: req.body.playerId,
        matchId: req.body.match,
        matchpartId: req.body.matchpartId,
        roundId: req.body.roundId,
        userId
      }

      const assistSaved = await this.assistService.saveAssist(assistToSave)
      res.status(200).send({
        assistSaved
      })
    } catch (error) {
      console.log(error)
      errorHelper.internalServerError('Error al añadir asistencia')
    }
  }

  getAssistsByMatchId = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return errorHelper.unauthorizedError('No userId provided in Auth')
      }
      const userId: number = req.user.id
      const matchId: number = Number(req.params.matchId)
      const assists = await this.assistService.findByMatch(matchId, userId)
      res.status(200).send({
        assists
      })
    } catch (error) {
      console.log(error)
      errorHelper.internalServerError('Error al obtener asistencia')
    }
  }

  deleteAssist = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return errorHelper.unauthorizedError('No userId provided in Auth')
      }
      const userId: number = req.user.id
      const assistId: number = parseInt(req.params.assistId)
      const assistDeleted = await this.assistService.deleteAssist(assistId, userId)
      res.status(200).send({
        assistDeleted
      })
    } catch (error) {
      console.log(error)
      errorHelper.internalServerError('Error al borrar asistencia')
    }
  }
}
