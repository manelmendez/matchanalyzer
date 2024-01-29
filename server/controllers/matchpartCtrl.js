export class MatchpartController {
  constructor ({ MatchpartModel }) {
    this.matchpartModel = MatchpartModel
  }

  addMatchpart = async (req, res) => {
    const userId = req.user.id
    const matchpartToSave = {
      matchId: req.body.matchId,
      formation: req.body.formation,
      time: req.body.time,
      team: req.body.team,
      roundId: req.body.roundId,
      userId
    }
    try {
      const savedPart = await this.matchpartModel.saveMatchpart({ matchpart: matchpartToSave })
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

  getMatchpartsByMatchId = async (req, res) => {
    const userId = req.user.id
    const matchId = req.params.matchId
    try {
      const matchParts = await this.matchpartModel.findByMatch({ matchId, userId })
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

  deleteMatchpart = async (req, res) => {
    const userId = req.user.id
    const id = req.params.matchpartId
    try {
      const matchpartDeleted = await this.matchpartModel.deleteMatchpart({ id, userId })
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
