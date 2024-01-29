export class AssistController {
  constructor ({ AssistModel }) {
    this.assistModel = AssistModel
  }

  addAssist = async (req, res) => {
    const userId = req.user.id
    const assistToSave = {
      goal: req.body.goal,
      type: req.body.type,
      player: req.body.playerId,
      matchId: req.body.match,
      matchpart: req.body.matchpartId,
      roundId: req.body.roundId,
      userId
    }
    try {
      const assistSaved = await this.assistModel.saveAssist({ assist: assistToSave })
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

  getAssistsByMatchId = async (req, res) => {
    const userId = req.user.id
    const matchId = req.params.matchId
    try {
      const assists = await this.assistModel.findByMatch({ matchId, userId })
      return res.status(200).send({
        assists
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al obtener asistencia: ${error}`
      })
    }
  }

  deleteAssist = async (req, res) => {
    const userId = req.user.id
    const assistId = req.params.assistId
    try {
      const assistDeleted = await this.assistModel.deleteAssist({ assistId, userId })
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
