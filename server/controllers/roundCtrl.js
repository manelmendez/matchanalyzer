import roundService from '../dao-postgres/round-service.js'
import matchService from '../dao-postgres/match-service.js'
import teamService from '../dao-postgres/team-service.js'

const addRound = async (req, res) => {
  let userId = req.user.id
  // getting data
  const round = {
    name: req.body.name,
    date: new Date(),
    competition: req.body.competition,
    userId: userId
  }
  console.log('Registrando competicion con nombre: ' + round.name + '...')
  try {
    const roundSaved = await roundService.saveRound(round)
    roundSaved.matches = []
    return res.status(200).send({
      round: roundSaved
    })
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      message: `Error al crear competición`
    })
  }
}

const deleteRound = async (req, res) => {
  let roundId = req.params.id
  let userId = req.user.id
  try {
    await roundService.deleteRound(roundId, userId)
    res.status(200).send({ message: `Jornada borrada` })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: `Error al borrar la jornada: ${err}` })
  }
}

const getCompetitionRounds = async (req, res) => {
  console.log('Obtener jornadas de competición con ID: ' + req.params.id)
  let id = req.params.id
  let userId = req.user.id
  const value = await roundService.findByCompetition(id, userId)
  let rounds = JSON.parse(JSON.stringify(value))
  let matches = await matchService.findByCompetition(id, userId)
  const teams = await teamService.findByCompetition(id, userId)
  for (let i = 0; i < rounds.length; i++) {
    rounds[i].matches = []
    for (let j = 0; j < matches.length; j++) {
      for (let k = 0; k < teams.length; k++) {
        if (matches[j].localTeam == teams[k].id) {
          matches[j].localTeam = JSON.parse(JSON.stringify(teams[k]))
        }
        if (matches[j].awayTeam == teams[k].id) {
          matches[j].awayTeam = JSON.parse(JSON.stringify(teams[k]))
        }
      }
      if (rounds[i].id == matches[j].round) {
        rounds[i].matches.push(JSON.parse(JSON.stringify(matches[j])))
      }
    }
  }
  res.status(200).send({
    rounds: rounds
  })
}

export default {
  addRound,
  deleteRound,
  getCompetitionRounds
}
