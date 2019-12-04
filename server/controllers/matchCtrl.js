const matchService = require('../dao/match-service')
const goalService = require('../dao/goal-service')
const assistService = require('../dao/assist-service')

function getCompetitionMatches(req, res) {
  let competition = req.competition
  matchService.findByCompetition(req.competition.id).then((matches) => {
    console.log(matches);
    
    for (let i = 0; i < competition.rounds.length; i++) {
      for (let j = 0; j < matches.length; j++) {
        if (matches[j].round == competition.rounds[i].id) {
          competition.rounds[i].matches.push(matches[j])     
        }
      }
    } 
    return res.status(200).send({
      competition: competition
    })
  }).catch((err) => {
    console.log(err);
    
    return res.status(500).send({
      message: `Error al crear competición: ${err}`
    })
  })
}
function addMatch(req, res, next) {
  // getting data
  let match = {
    localTeam: req.body.localTeam,
    localTeamGoals: req.body.localTeamGoals,
    awayTeam: req.body.awayTeam,
    awayTeamGoals: req.body.awayTeamGoals,
    matchDay: new Date(),
    competition: req.body.competition,
    round: req.body.round
  }
  console.log("Añadiendo partido...")
  matchService.saveMatch(match).then((matchSaved) => {
    return res.status(200).send({
      match: matchSaved
    })
  }).catch((err) => {
    console.log(err);
    
    return res.status(500).send({
      message: `Error al crear competición: ${err}`
    })
  })
}

function updateMatch (req, res, next) {
  let id = req.params.id
  let match = {
    localTeam: req.body.localTeam,
    localTeamGoals: req.body.localTeamGoals,
    awayTeam: req.body.awayTeam,
    awayTeamGoals: req.body.awayTeamGoals,
    matchDay: req.body.matchDay,
    competition: req.body.match.competition,
    round: req.body.round
  }
  console.log("Actualizar partido");
  matchService.updateMatch(id, match).then((matchUpdated) => {    
    res.status(200).send({match: matchUpdated})
  }).catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al actualizar el partido`})
  })
}

function deleteMatch (req, res) {
  let matchId = req.params.id
  matchService.deleteMatch(matchId)
  .then((value) => {
    res.status(200).send({match: matchId})
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al borrar el partido`})
  })
}

function addStats(req, res) {
  let goals = req.body.goals
  let substitutions = req.body.substitutions
  let assists = req.body.assists
  let cards = req.body.cards

  goalService.saveGoal(goals).then(() => {
    assistService.saveAssist(assists).then(() => {

    })
  })
}
module.exports = {
  getCompetitionMatches,
  addMatch,
  updateMatch,
  deleteMatch
}
