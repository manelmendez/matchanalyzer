export class MinuteController {
  constructor ({ MinuteModel }) {
    this.minuteModel = MinuteModel
  }

  addMinute = async (req, res) => {
    const userId = req.user.id
    const minute = {
      player: req.body.playerId,
      position: req.body.position,
      matchpart: req.body.matchpartId,
      matchId: req.body.matchId,
      roundId: req.body.roundId,
      userId
    }
    try {
      const minuteSaved = await this.minuteModel.saveMinute({ minute })
      return res.status(200).send({
        minuteSaved
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        message: `Error al añadir partes: ${error}`
      })
    }
  }

  getMinutesByMatchId = async (req, res) => {
    const userId = req.user.id
    const matchId = req.params.matchId
    try {
      const minutes = await this.minuteModel.findByMatch({ matchId, userId })
      return res.status(200).send({
        minutes
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al obtener partes: ${error}`
      })
    }
  }

  deleteMinute = async (req, res) => {
    const userId = req.user.id
    const id = req.params.minuteId
    try {
      const minuteDeleted = await this.minuteModel.deleteMinute({ id, userId })
      return res.status(200).send({
        minuteDeleted
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al obtener partes: ${error}`
      })
    }
  }
}
