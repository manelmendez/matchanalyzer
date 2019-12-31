// const Team = require('../models/team.js')
// const competitionService = require('../dao/competition-service')
const teamService = require('../dao/team-service')

function addTeam(req, res) {
  let userId = req.user.id
  // getting data
  let team = {
    name: req.body.name,
    manager: req.body.manager,
    season: req.body.season,
    avatar: req.body.avatar!=null ? req.body.avatar : "assets/images/escudo-vacio.png",
    signupDate: new Date(),
    userId: userId
  }
  console.log("Registrando equipo con nombre: " + team.name + "...");
  teamService.saveTeam(team).then((teamSaved) => {    
    return res.status(200).send({
      team: teamSaved
    })
  }).catch((err) => {
    console.log(err);
    return res.status(500).send({
      message: `Error al registrar el equipo`
    })
  })
}

function addNoManagerTeam(req, res) {  
  let userId = req.user.id
  let team = {
    name: req.body.name,
    season: req.body.season,
    avatar: req.body.avatar!=null ? req.body.avatar : "assets/images/escudo-vacio.png",
    signupDate: new Date(),
    competition: req.body.competition,
    userId: userId
  }  
  console.log("Registrando equipo con nombre: " + team.name + "...");
  teamService.saveTeam(team).then((teamSaved) => {    
    return res.status(200).send({
      team: teamSaved
    })
  }).catch((err) => {
    console.log(err);
    return res.status(500).send({
      message: `Error al registrar el equipo`
    })
  }) 
    
}


function getTeam(req, res) {
  let userId = req.user.id
  let teamId = req.params.id
  console.log("Buscando equipo con id: " + teamId + " en la base de datos...");
  //search team on DB
  teamService.findById(teamId, userId).then((result) => {
    if (result) {      
      let team = result[0][0]
      team.players = []
      for (let i = 0; i < result[1].length; i++) {
        let player = result[1][i]
        team.players.push(player)        
      }      
      console.log("Equipo " + result[0][0].name + " entontrado.");
      res.status(200).send({
        message: 'Datos obtenidos correctamente',
        team: team
      })
    } 
    else {
      console.log("No existe el equipo.")
      return res.status(401).send({
        message: 'No se ha encontrado el equipo'
      })
    }
  }).catch((err) => {
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al buscar`
    })
  })
}

function getAllTeams(req, res) {
  console.log("Buscando todos los equipos en la base de datos...");
  teamService.findAll().then((teams) => {
    console.log("Equipos encontrados.");
    res.status(200).send({
      teams: teams
    })
  }).catch((err) => {
    console.log(`Error: ${err}`)
  })
}

function getUserTeams(req, res) {
  let managerId = req.params.userId
  let userId = req.user.id
  console.log("Buscando equipos del usuario " + managerId + " en la base de datos..." );
  //search team on DB
  teamService.findByManager(managerId, userId).then((teams) => {
    if (teams) {
      console.log("Equipos de " + managerId + " entontrados.");
      // send user
      res.status(200).send({
        message: 'Datos obtenidos correctamente',
        teams: teams
      })
    }
    else {
      console.log("No existen equipos.")
      return res.status(401).send({
        message: 'No se han encontrado equipos'
      })
    }
  }).catch((err) => {
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al buscar`
    })
  })
}

function updateTeam(req, res) {
  let team = req.body.team
  let userId = req.user.id
  teamService.updateTeam(req.params.id, team, userId)
  .then((value) => {
    res.status(200).send({team: value})
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al editar team`})
  })
}

function deleteTeam (req, res) {
  let teamId = req.params.id  
  let userId = req.user.id
  teamService.deleteTeam(teamId, userId).then((value) => {
    res.status(200).send({team: value})
  }).catch((err) => {
    console.log(err);
    
    res.status(500).send({message: `Error al borrar el equipo`})
  })
}

module.exports = {
  addTeam,
  getTeam,
  getAllTeams,//
  getUserTeams,
  addNoManagerTeam,
  updateTeam,
  deleteTeam
}
