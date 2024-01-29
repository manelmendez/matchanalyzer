export class MatchController {
  constructor ({ MatchModel }) {
    this.matchModel = MatchModel
  }

  getMatch = async (req, res) => {
    const userId = req.user.id
    const id = req.params.matchId
    try {
      const match = await this.matchModel.findById({ id, userId })
      return res.status(200).send({
        match
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al obtener match: ${error}`
      })
    }
  }

  addMatch = async (req, res) => {
    const userId = req.user.id
    // getting data
    const match = {
      localTeam: req.body.localTeam,
      localTeamGoals: req.body.localTeamGoals,
      awayTeam: req.body.awayTeam,
      awayTeamGoals: req.body.awayTeamGoals,
      matchDay: new Date(),
      competition: req.body.competition,
      round: req.body.round,
      userId
    }
    console.log('Añadiendo partido...')
    try {
      const matchSaved = await this.matchModel.saveMatch({ match })
      return res.status(200).send({
        match: matchSaved
      })
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        message: `Error al crear competición: ${err}`
      })
    }
  }

  updateMatch = async (req, res) => {
    const id = req.params.id
    const userId = req.user.id
    const match = {
      localTeam: req.body.localTeam.id,
      localTeamGoals: req.body.localTeamGoals,
      awayTeam: req.body.awayTeam.id,
      awayTeamGoals: req.body.awayTeamGoals,
      competition: req.body.competition,
      round: req.body.round
    }
    console.log('Actualizar partido')
    try {
      const matchUpdated = await this.matchModel.updateMatch({ match, id, userId })
      res.status(200).send({ match: matchUpdated })
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: 'Error al actualizar el partido' })
    }
  }

  deleteMatch = async (req, res) => {
    const id = req.params.id
    const userId = req.user.id
    await this.matchModel.deleteMatch({ id, userId }).then(() => {
      res.status(200).send({ match: id })
    })
      .catch((err) => {
        console.log(err)
        res.status(500).send({ message: 'Error al borrar el partido' })
      })
  }
}
