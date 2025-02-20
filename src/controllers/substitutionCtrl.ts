import { Request, Response } from 'express'
import { SubstitutionService } from '../dao-postgres/substitution-service'
import { Substitution } from '../models/substitution'
import errorHelper from '../utils/errorHelper.js'

export class SubstitutionController {
  private substitutionService: SubstitutionService
  constructor (substitutionService: SubstitutionService) {
    this.substitutionService = substitutionService
  }

  addSubstitution = async (req: Request, res: Response) => {
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = req.user.id
    const substitutionToSave: Substitution = {
      minute: req.body.minute,
      playerIn: req.body.playerIn,
      playerOut: req.body.playerOut,
      matchId: req.body.matchId,
      matchpartId: req.body.matchpartId,
      roundId: req.body.roundId,
      userId
    }
    try {
      const substitutionSaved =
        await this.substitutionService.saveSubstitution(substitutionToSave)
      return res.status(200).send({
        substitutionSaved
      })
    } catch (error) {
      console.log(error)
      errorHelper.internalServerError('Error al añadir sustituciones')
    }
  }

  getSubstitutionsByMatchId = async (req: Request, res: Response) => {
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = req.user.id
    const matchId: number = Number(req.params.matchId)
    try {
      const substitutions = await this.substitutionService.findByMatch(matchId, userId)
      return res.status(200).send({
        substitutions
      })
    } catch (error) {
      console.log(error);
      errorHelper.internalServerError('Error al obtener sustituciones')
    }
  }

  deleteSubstitution = async (req: Request, res: Response) => {
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = req.user.id
    const id: number = Number(req.params.substitutionId)
    try {
      const substitutionDeleted = await this.substitutionService.deleteSubstitution(id, userId)
      return res.status(200).send({
        substitutionDeleted
      })
    } catch (error) {
      console.log(error);
      errorHelper.internalServerError('Error al borrar sustitucion')
    }
  }
}
