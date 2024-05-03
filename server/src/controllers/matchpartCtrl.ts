import { Request, Response, NextFunction } from 'express'
import { MatchpartService } from '../dao-postgres/matchpart-service'
import { MatchPart } from '../models/matchpart'

export class MatchpartController {
  private matchpartService: MatchpartService

  constructor (matchpartService: MatchpartService) {
    this.matchpartService = matchpartService
  }

  addMatchpart = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = Number(req.user.id)
    const matchpartToSave: MatchPart = {
      matchId: req.body.matchId,
      formation: req.body.formation,
      time: req.body.time,
      teamId: req.body.teamId,
      roundId: req.body.roundId,
      userId
    }
    try {
      const savedPart = await this.matchpartService.saveMatchpart(matchpartToSave)
      if (savedPart) {
        return res.status(200).send({
          savedPart
        })
      } else {
        return res.status(500).send({
          message: 'Error al añadir partes'
        })
      }
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        message: 'Error al añadir partes'
      })
    }
  }

  getMatchpartsByMatchId = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = Number(req.user.id)
    const matchId: number = Number(req.params.matchId)
    try {
      const matchParts = await this.matchpartService.findByMatch(matchId, userId)
      if (matchParts) {
        return res.status(200).send({
          matchParts
        })
      } else {
        return res.status(500).send({
          message: 'Error al obtener partes'
        })
      }
    } catch (error) {
      return res.status(500).send({
        message: `Error al obtener partes ${error}`
      })
    }
  }

  deleteMatchpart = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = Number(req.user.id)
    const id: number = Number(req.params.matchpartId)
    try {
      const matchpartDeleted = await this.matchpartService.deleteMatchpart(id, userId)
      return res.status(200).send({
        matchpartDeleted
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al borrar parte: ${error}`
      })
    }
  }
}
