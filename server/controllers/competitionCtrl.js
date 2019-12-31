const competitionService = require('../dao/competition-service')
const teamService = require('../dao/team-service')

function addCompetition(req, res) {
  let userId = req.user.id
  // getting data
  let competition = {
    name: req.body.name,
    season: req.body.season,
    manager: req.body.manager,
    discipline: req.body.discipline,
    category: req.body.category,
    signupDate: new Date(),
    userId: userId
  }
  console.log("Registrando competicion con nombre: " + competition.name + "...")
  // saving competition in DB
  competitionService.saveCompetition(competition).then((competitionSaved) => {
    return res.status(200).send({
      competition: competitionSaved
    })
  }).catch((err) => {
    console.log(err)
    return res.status(500).send({
      message: `Error al crear competición`
    })
  })
    
}

function getCompetition(req, res) {  
  let id = req.params.id
  let userId = req.user.id
  console.log("Buscando competición con id: " + id + " en la base de datos...");
  //search competition on DB
  competitionService.findById(id, req.user.id, userId).then((result => {    
    if (result) {     
      let competition = JSON.parse(JSON.stringify(result[0]))
      teamService.findByCompetition(id, userId).then((teams => {
        competition.teams = JSON.parse(JSON.stringify(teams))        
        res.status(200).send({
          competition: competition
        })
      })) 
    }
    else {
      console.log("No existe la competición.")
      return res.status(404).send({
        message: 'No se ha encontrado la competición'
      })
    }
  })).catch((err) => {
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al buscar`
    })
  })
}

function getUserCompetitions(req, res) {
  let id = req.params.id
  let userId = req.user.id
  console.log("Buscando todas las competiciones en la base de datos...");
  competitionService.findByManager(id, userId).then((competitions) => {
    console.log("Competiciones encontradas.");    
    res.status(200).send({
      competitions: competitions
    })
  }).catch((err) => {
    console.log(`Error: ${err}`)
  })
}

function updateCompetition(req, res) {
  let userId = req.user.id
  const competition = {
    name: req.body.name,
    season: req.body.season,
    manager: req.body.manager,
    discipline: req.body.discipline,
    category: req.body.category,
  }
  competitionService.updateCompetition(competition, req.params.id, userId).then((competitionUpdated) => {    
    res.status(200).send({competition: competition})
  }).catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al actualizar el partido`})
  })
}
function deleteCompetition(req, res) {
  let userId = req.user.id
  competitionService.deleteCompetition(req.params.id, userId).then((competition) => {
    return res.status(200).send({competition: req.params.id})
  }).catch((err) => {
    return res.status(500).send({
      message: `Error al borrar la competición`
    })
  })
}

module.exports = {
  addCompetition,
  getCompetition,
  getUserCompetitions,
  updateCompetition,
  deleteCompetition
}
