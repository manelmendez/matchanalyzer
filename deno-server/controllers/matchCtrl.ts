import * as matchService from '../dao/match-service.ts'

function getCompetitionMatches(req: any, res: any) {
  let competition = req.competition;
  let userId = req.user.id;
  matchService.findByCompetition(req.competition.id, userId).then((matches: any) => {
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
  }).catch((err: any) => {
    console.log(err);
    
    return res.status(500).send({
      message: `Error al crear competición: ${err}`
    });
  });
}
async function getMatch(req: any, res: any) {
  let userId = req.user.id;
  let matchId = req.params.matchId;
  try {
    let match: any = await matchService.findById(matchId, userId);
    return res.status(200).send({
      match: match[0]
    });
  } catch (error) {
    return res.status(500).send({
      message: `Error al obtener match: ${error}`
    });
  }  
}
function addMatch(req: any, res: any) {
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
  matchService.saveMatch(match).then((matchSaved: any) => {
    return res.status(200).send({
      match: matchSaved
    });
  }).catch((err: any) => {
    console.log(err);
    
    return res.status(500).send({
      message: `Error al crear competición: ${err}`
    });
  });
}

function updateMatch (req: any, res: any) {
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
  matchService.updateMatch(match, id, userId).then((matchUpdated: any) => {    
    res.status(200).send({match: matchUpdated});
  }).catch((err: any) => {
    console.log(err);
    res.status(500).send({message: `Error al actualizar el partido`});
  });
}

function deleteMatch (req: any, res: any) {
  let matchId = req.params.id;
  let userId = req.user.id;
  matchService.deleteMatch(matchId, userId)
  .then(() => {
    res.status(200).send({match: matchId});
  })
  .catch((err: any) => {
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