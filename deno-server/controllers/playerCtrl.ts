// const Player = require('../models/player.js')
import * as playerService from '../dao/player-service.ts'

function addPlayer(req: any, res: any) {
  let userId = req.user.id;
  let player = {
    name: req.body.name,
    position: req.body.position,
    year: req.body.year,
    team: req.body.team,
    avatar: req.body.avatar!=null ? req.body.avatar : "assets/images/person_icon.png",
    userId: userId
  };
  console.log("No existe jugador con ese nombre, registrando...");
  playerService.savePlayer(player).then((playerSaved) => {
    return res.status(200).send({
      player: playerSaved
    });
  })
  .catch((err) => {
    return res.status(500).send({
      message: `Error al crear el jugador: ${err}`
    });
  });
}
async function getPlayersByTeamId(req: any, res: any) {
  let userId = req.user.id;
  let teamId = req.params.teamId;
  try {
    let players = await playerService.findByTeam(teamId, userId);
    return res.status(200).send({
      players: players
    });
  } catch (error) {
    return res.status(500).send({
      message: `Error al obtener players: ${error}`
    });
  }  
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

function updatePlayer(req: any, res: any) {
  let player = req.body;
  let userId = req.user.id;
  playerService.updatePlayer(req.params.id, player, userId)
  .then(() => {    
    res.status(200).send({player: player});
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al editar player: ${err}`});
  });
}

function deletePlayer (req: any, res: any) {
  let playerId = req.params.id;
  let userId = req.user.id;
  playerService.deletePlayer(playerId, userId)
  .then(() => {    
    res.status(200).send({player: playerId});
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al borrar el jugador`});
  });
}

export default {
  addPlayer,
  getPlayersByTeamId,
  updatePlayer,
  deletePlayer
};
