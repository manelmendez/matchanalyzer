// const Player = require('../models/player.js')
import playerService from '../dao-postgres/player-service.js'

const addPlayer = async (req, res) => {
  let userId = req.user.id
  let player = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    position: req.body.position,
    year: req.body.year,
    team: req.body.team,
    avatar:
      req.body.avatar != null
        ? req.body.avatar
        : 'assets/images/person_icon.png',
    userId: userId,
    guest: req.body.guest
  }
  try {
    const playerSaved = await playerService.savePlayer(player)
    return res.status(200).send({
      player: playerSaved
    })
  } catch (err) {
    return res.status(500).send({
      message: `Error al crear el jugador: ${err}`
    })
  }
}
const getPlayersByTeamId = async (req, res) => {
  let userId = req.user.id
  console.log(userId)
  let teamId = req.params.teamId
  try {
    const players = await playerService.findByTeam(teamId, userId)
    return res.status(200).send({
      players: players
    })
  } catch (error) {
    return res.status(500).send({
      message: `Error al obtener players: ${error}`
    })
  }
}

const updatePlayer = async (req, res) => {
  let player = req.body
  let userId = req.user.id
  try {
    const playerUpdated = await playerService.updatePlayer(
      req.params.id,
      player,
      userId
    )
    res.status(200).send({ player: playerUpdated })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: `Error al editar player: ${err}` })
  }
}

const deletePlayer = async (req, res) => {
  let playerId = req.params.id
  let userId = req.user.id
  try {
    await playerService.deletePlayer(playerId, userId)
    res.status(200).send({ player: playerId })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: `Error al borrar el jugador` })
  }
}

export default {
  addPlayer,
  getPlayersByTeamId,
  updatePlayer,
  deletePlayer
}
