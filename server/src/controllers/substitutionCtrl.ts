import { Request, Response } from 'express'
import { SubstitutionService } from '../dao-postgres/substitution-service'
import { Substitution } from '../models/substitution'

export class SubstitutionController {
  private substitutionService: SubstitutionService
  constructor (substitutionService: SubstitutionService) {
    this.substitutionService = substitutionService
  }

  addSubstitution = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
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
      return res.status(500).send({
        message: `Error al añadir sustitucion: ${error}`
      })
    }
  }

  getSubstitutionsByMatchId = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    const matchId: number = Number(req.params.matchId)
    try {
      const substitutions = await this.substitutionService.findByMatch(matchId, userId)
      return res.status(200).send({
        substitutions
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al obtener sustitucion: ${error}`
      })
    }
  }

  deleteSubstitution = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    const id: number = Number(req.params.substitutionId)
    try {
      const substitutionDeleted = await this.substitutionService.deleteSubstitution(id, userId)
      return res.status(200).send({
        substitutionDeleted
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al borrar sustitucion: ${error}`
      })
    }
  }
}
