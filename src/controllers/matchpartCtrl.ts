import { NextFunction, Request, Response } from 'express'
import { MatchpartService } from '../dao-postgres/matchpart-service'
import { MatchPart } from '../models/matchpart'
import errorHelper from '../utils/errorHelper.js'

export class MatchpartController {
  private matchpartService: MatchpartService

  constructor(matchpartService: MatchpartService) {
    this.matchpartService = matchpartService
  }

  addMatchpart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return errorHelper.unauthorizedError('No userId provided in Auth')
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
          res.status(200).send({
            savedPart
          })
        } else {
          errorHelper.internalServerError('Error al añadir partes')
        }
      } catch (error) {
        console.log(error)
        errorHelper.internalServerError('Error al añadir partes')
      }
    }
    catch (error) {
      next(error)
    }
  }

  getMatchpartsByMatchId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return errorHelper.unauthorizedError('No userId provided in Auth')
      }
      const userId: number = Number(req.user.id)
      const matchId: number = Number(req.params.matchId)
      try {
        const matchParts = await this.matchpartService.findByMatch(matchId, userId)
        if (matchParts) {
          res.status(200).send({
            matchParts
          })
        } else {
          errorHelper.notFoundError('No se han encontrado partes')
        }
      } catch (error) {
        console.log(error)
        errorHelper.internalServerError('Error al obtener partes')
      }
    }
    catch (error) {
      next(error)
    }
  }

  deleteMatchpart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return errorHelper.unauthorizedError('No userId provided in Auth')
      }
      const userId: number = Number(req.user.id)
      const id: number = Number(req.params.matchpartId)
      try {
        const matchpartDeleted = await this.matchpartService.deleteMatchpart(id, userId)
        res.status(200).send({
          matchpartDeleted
        })
      } catch (error) {
        console.log(error)
        errorHelper.internalServerError('Error al borrar parte')
      }
    }
    catch (error) {
      next(error)
    }
  }
}
