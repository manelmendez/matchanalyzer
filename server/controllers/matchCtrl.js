import matchService from '../dao-postgres/match-service.js'

const getMatch = async (req, res) => {
  let userId = req.user.id
  let matchId = req.params.matchId
  try {
    const match = await matchService.findById(matchId, userId)
    return res.status(200).send({
      match: match
    })
  } catch (error) {
    return res.status(500).send({
      message: `Error al obtener match: ${error}`
    })
  }
}
const addMatch = async (req, res) => {
  let userId = req.user.id
  // getting data
  let match = {
    localTeam: req.body.localTeam,
    localTeamGoals: req.body.localTeamGoals,
    awayTeam: req.body.awayTeam,
    awayTeamGoals: req.body.awayTeamGoals,
    matchDay: new Date(),
    competition: req.body.competition,
    round: req.body.round,
    userId: userId
  }
  console.log('Añadiendo partido...')
  try {
    const matchSaved = await matchService.saveMatch(match)
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

const updateMatch = async (req, res) => {
  let id = req.params.id
  let userId = req.user.id
  let match = {
    localTeam: req.body.localTeam.id,
    localTeamGoals: req.body.localTeamGoals,
    awayTeam: req.body.awayTeam.id,
    awayTeamGoals: req.body.awayTeamGoals,
    competition: req.body.competition,
    round: req.body.round
  }
  console.log('Actualizar partido')
  try {
    const matchUpdated = await matchService.updateMatch(match, id, userId)
    res.status(200).send({ match: matchUpdated })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: `Error al actualizar el partido` })
  }
}

const deleteMatch = async (req, res) => {
  let matchId = req.params.id
  let userId = req.user.id
  await matchService
    .deleteMatch(matchId, userId)
    .then(() => {
      res.status(200).send({ match: matchId })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: `Error al borrar el partido` })
    })
}

export default {
  addMatch,
  getMatch,
  updateMatch,
  deleteMatch
}
