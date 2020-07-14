import matchService from '../dao-postgres/match-service.js'

const getCompetitionMatches = async(req, res) => {
  let competition = req.competition;
  let userId = req.user.id;
  matchService.findByCompetition(req.competition.id, userId).then((matches) => {
    console.log(matches);
    
    for (let i = 0; i < competition.rounds.length; i++) {
      for (let j = 0; j < matches.length; j++) {
        if (matches[j].round == competition.rounds[i].id) {
          competition.rounds[i].matches.push(matches[j]);     
        }
      }
    } 
    return res.status(200).send({
      competition: competition
    });
  }).catch((err) => {
    console.log(err);
    
    return res.status(500).send({
      message: `Error al crear competición: ${err}`
    });
  });
}
const getMatch = async(req, res) => {
  let userId = req.user.id;
  let matchId = req.params.matchId;
  try {
    let match = await matchService.findById(matchId, userId);
    return res.status(200).send({
      match: match[0]
    });
  } catch (error) {
    return res.status(500).send({
      message: `Error al obtener match: ${error}`
    });
  }  
}
const addMatch = async(req, res) => {
  let userId = req.user.id;
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
  };
  console.log("Añadiendo partido...");
  matchService.saveMatch(match).then((matchSaved) => {
    return res.status(200).send({
      match: matchSaved
    });
  }).catch((err) => {
    console.log(err);
    
    return res.status(500).send({
      message: `Error al crear competición: ${err}`
    });
  });
}

const updateMatch = async(req, res) => {
  let id = req.params.id;
  let userId = req.user.id;
  let match = {
    localTeam: req.body.localTeam.id,
    localTeamGoals: req.body.localTeamGoals,
    awayTeam: req.body.awayTeam.id,
    awayTeamGoals: req.body.awayTeamGoals,
    competition: req.body.competition,
    round: req.body.round,
  };
  console.log("Actualizar partido");
  matchService.updateMatch(match, id, userId).then((matchUpdated) => {    
    res.status(200).send({match: matchUpdated});
  }).catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al actualizar el partido`});
  });
}

const deleteMatch = async(req, res) => {
  let matchId = req.params.id;
  let userId = req.user.id;
  matchService.deleteMatch(matchId, userId)
  .then(() => {
    res.status(200).send({match: matchId});
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al borrar el partido`});
  });
}

export default {
  getCompetitionMatches,
  addMatch,
  getMatch,
  updateMatch,
  deleteMatch
};
