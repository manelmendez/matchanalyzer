export class RoundController {
  constructor ({ RoundModel, MatchModel, TeamModel }) {
    this.roundModel = RoundModel
    this.matchModel = MatchModel
    this.teamModel = TeamModel
  }

  addRound = async (req, res) => {
    const userId = req.user.id
    // getting data
    const round = {
      name: req.body.name,
      date: new Date(),
      competition: req.body.competition,
      userId
    }
    console.log('Registrando competicion con nombre: ' + round.name + '...')
    try {
      const roundSaved = await this.roundModel.saveRound({ round })
      roundSaved.matches = []
      return res.status(200).send({
        round: roundSaved
      })
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        message: 'Error al crear competición'
      })
    }
  }

  deleteRound = async (req, res) => {
    const id = req.params.id
    const userId = req.user.id
    try {
      await this.roundModel.deleteRound({ id, userId })
      res.status(200).send({ message: 'Jornada borrada' })
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: `Error al borrar la jornada: ${err}` })
    }
  }

  getCompetitionRounds = async (req, res) => {
    console.log('Obtener jornadas de competición con ID: ' + req.params.id)
    const competitionId = req.params.id
    const userId = req.user.id
    const value = await this.roundModel.findByCompetition({ competitionId, userId })
    const rounds = JSON.parse(JSON.stringify(value))
    const matches = await this.matchModel.findByCompetition({ competitionId, userId })
    const teams = await this.teamModel.findByCompetition({ competitionId, userId })
    for (let i = 0; i < rounds.length; i++) {
      rounds[i].matches = []
      for (let j = 0; j < matches.length; j++) {
        for (let k = 0; k < teams.length; k++) {
          if (matches[j].localTeam === teams[k].id) {
            matches[j].localTeam = JSON.parse(JSON.stringify(teams[k]))
          }
          if (matches[j].awayTeam === teams[k].id) {
            matches[j].awayTeam = JSON.parse(JSON.stringify(teams[k]))
          }
        }
        if (rounds[i].id === matches[j].round) {
          rounds[i].matches.push(JSON.parse(JSON.stringify(matches[j])))
        }
      }
    }
    res.status(200).send({
      rounds
    })
  }
}
