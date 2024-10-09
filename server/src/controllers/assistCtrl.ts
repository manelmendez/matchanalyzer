import { Request, Response, NextFunction } from 'express'
import { AssistService } from '../dao-postgres/assist-service'
import {Assist} from '../models/assist.js'

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
      return res.status(500).send({
        message: `Error al añadir asistencia: ${error}`
      })
    }
  }

  getAssistsByMatchId = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    const matchId: number = Number(req.params.matchId)
    try {
      const assists = await this.assistService.findByMatch(matchId, userId)
      console.log(assists)
      return res.status(200).send({
        assists
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al obtener asistencia: ${error}`
      })
    }
  }

  deleteAssist = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    const assistId: number = parseInt(req.params.assistId)
    try {
      const assistDeleted = await this.assistService.deleteAssist(assistId, userId)
      return res.status(200).send({
        assistDeleted
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al borrar asistencia: ${error}`
      })
    }
  }
}
