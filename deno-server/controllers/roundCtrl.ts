import * as roundService from '../dao/round-service.ts'
import * as matchService from '../dao/match-service.ts'
import * as teamService from '../dao/team-service.ts'

function addRound(req: any, res: any) {
  let userId = req.user.id;
  // getting data
  const round = {
    name: req.body.name,
    date: new Date(),
    competition: req.body.competition,
    userId: userId
  };
  console.log("Registrando competicion con nombre: " + round.name + "...");
  roundService.saveRound(round).then((roundSaved: any) => {
    roundSaved.matches=[];
    return res.status(200).send({
      round: roundSaved
    });
  }).catch((err) => {
    console.log(err);
    return res.status(500).send({
      message: `Error al crear competición`
    });
  });
}

function deleteRound(req: any, res: any) {
  let roundId = req.params.id;
  let userId = req.user.id;
  roundService.deleteRound(roundId, userId)
  .then((round) => {
    console.log(round);
    res.status(200).send({message: `Jornada borrada`});
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({message: `Error al borrar la jornada: ${err}`});
  });
}

function getCompetitionRounds(req: any, res: any) {
  console.log("Obtener jornadas de competición con ID: "+req.params.id);
  let id = req.params.id;
  let userId = req.user.id;
  roundService.findByCompetition(id, userId).then((value => {          
    let rounds = JSON.parse(JSON.stringify(value));
    matchService.findByCompetition(id, userId).then(((matches: any) => {
      teamService.findByCompetition(id, userId).then(((teams: any) => {
        for (let i = 0; i < rounds.length; i++) {
          rounds[i].matches=[];
          for (let j = 0; j < matches.length; j++) {
            for (let k = 0; k < teams.length; k++) {
              if (matches[j].localTeam == teams[k].id) {
                matches[j].localTeam = JSON.parse(JSON.stringify(teams[k]));
              }
              if (matches[j].awayTeam == teams[k].id) {
                matches[j].awayTeam = JSON.parse(JSON.stringify(teams[k]));
              }
            }
            if (rounds[i].id == matches[j].round) {
              rounds[i].matches.push(JSON.parse(JSON.stringify(matches[j])));
            }
          }
        }
        console.log(rounds);
        res.status(200).send({
          rounds: rounds
        });
      }));
    }));
  }));
}


export default {
  addRound,
  deleteRound,
  getCompetitionRounds
};
