// const Player = require('../models/player.js')
const playerService = require('../dao/player-service')

function addPlayer(req, res, next) {
  let player = {
    name: req.body.name,
    position: req.body.position,
    year: req.body.year,
    team: req.body.team,
    avatar: req.body.avatar!=null ? req.body.avatar : "assets/images/person_icon.png",
  }
  console.log("No existe jugador con ese nombre, registrando...")
  playerService.savePlayer(player).then((playerSaved) => {
    return res.status(200).send({
      player: playerSaved
    })
  })
  .catch((err) => {
    return res.status(500).send({
      message: `Error al crear el jugador: ${err}`
    })
  })
}

// function getPlayer(req, res) {
//   let playerId = req.params.id
//   //search player on DB
//   playerService.findById(playerId).then((player) => {
//     if (!player) {
//       console.log("No existe el usuario")
//       return res.status(401).send({
//         message: 'Algunos de los datos introducidos son incorrectos.'
//       })
//     }
//     if (player) {
//       console.log(player);
//       res.status(200).send({
//         message: 'Datos obtenidos correctamente',
//         player: player
//       })
//     }
//   }).catch((err) => {
//     console.log(`Error: ${err}`)
//     return res.status(500).send({
//       message: `Error al buscar`
//     })
//   })
// }

// function getAllPlayers(req, res) {
//   playerService.findAll().then((players) => {
//     res.status(200).send({
//       players: players
//     })
//   }).catch((err) => {
//     console.log(`Error: ${err}`)
//   })
// }

function updatePlayer(req, res) {
  let player = req.body
  playerService.updatePlayer(req.params.id, player)
  .then((value) => {    
    res.status(200).send({player: player})
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al editar player: ${err}`})
  })
}

function deletePlayer (req, res) {
  let playerId = req.params.id
  playerService.deletePlayer(playerId)
  .then((value) => {    
    res.status(200).send({player: playerId})
  })
  .catch((err) => {
    res.status(500).send({message: `Error al borrar el jugador`})
  })
}
module.exports = {
  addPlayer,
//   getPlayer,
//   getAllPlayers,
  updatePlayer,
  deletePlayer
}
