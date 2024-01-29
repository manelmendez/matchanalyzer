export class SubstitutionController {
  constructor ({ SubstitutionModel }) {
    this.substitutionModel = SubstitutionModel
  }

  addSubstitution = async (req, res) => {
    const userId = req.user.id
    const substitutionToSave = {
      minute: req.body.minute,
      playerIn: req.body.playerIn,
      playerOut: req.body.playerOut,
      matchId: req.body.matchId,
      matchpart: req.body.matchpartId,
      roundId: req.body.roundId,
      userId
    }
    try {
      const substitutionSaved =
        await this.substitutionModel.saveSubstitution({ substitution: substitutionToSave })
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

  getSubstitutionsByMatchId = async (req, res) => {
    const userId = req.user.id
    const matchId = req.params.matchId
    try {
      const substitutions = await this.substitutionModel.findByMatch({ matchId, userId })
      return res.status(200).send({
        substitutions
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al obtener sustitucion: ${error}`
      })
    }
  }

  deleteSubstitution = async (req, res) => {
    const userId = req.user.id
    const id = req.params.substitutionId
    try {
      const substitutionDeleted = await this.substitutionModel.deleteSubstitution({ id, userId })
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
