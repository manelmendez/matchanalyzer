import { Router } from '../deps.ts';
// const oauth2Ctrl = require('../controllers/oauth2Ctrl')
import userCtrl from '../controllers/userCtrl.ts';
import teamCtrl from '../controllers/teamCtrl.ts';
import playerCtrl from '../controllers/playerCtrl.ts';
import competitionCtrl from '../controllers/competitionCtrl.ts';
import roundCtrl from '../controllers/roundCtrl.ts';
import matchCtrl from '../controllers/matchCtrl.ts';
import matchpartCtrl from '../controllers/matchpartCtrl.ts';
import minuteCtrl from '../controllers/minuteCtrl.ts';
import goalCtrl from '../controllers/goalCtrl.ts';
import assistCtrl from '../controllers/assistCtrl.ts';
import cardCtrl from '../controllers/cardCtrl.ts';
import substitutionCtrl from '../controllers/substitutionCtrl.ts';
import imageServices from '../services/image-services.ts';
import auth from '../middlewares/auth.ts';
const api = new Router();

// AUTH
// api.post('/private', auth.isAuth);

// OAUTH2
// api.get('/oauth/google', oauth2Ctrl.verifyGoogleToken)

// IMAGES
// api.post('/uploadImage', imageServices.uploadImage);
api.get("/", (context) => {
  console.log("Holllll");
  
})
// USER
api.post('/api/signUp', userCtrl.signUp);
api.post('/api/signIn', userCtrl.signIn);
// api.get('/api/getUser/:id', auth.checkAuth, userCtrl.getUser);
// api.get('/api/getAllUsers', auth.checkAuth, userCtrl.getAllUsers);
// api.put('/api/updateUser/:id', auth.checkAdmin, userCtrl.updateUser);
// api.delete('/api/deleteUser/:id', auth.checkAdmin, userCtrl.deleteUser);

// // TEAM
// api.post('/api/addTeam', auth.checkAuth, teamCtrl.addTeam);
// api.get('/api/getTeam/:id', auth.checkAuth, teamCtrl.getTeam);
// api.get('/api/getUserTeams/:userId', auth.checkAuth, teamCtrl.getUserTeams);
// api.post('/api/addNoManagerTeam', auth.checkAuth, teamCtrl.addNoManagerTeam);
// api.put('/api/updateTeam/:id', auth.checkAuth, teamCtrl.updateTeam);
// api.delete('/api/deleteTeam/:id', auth.checkAuth, teamCtrl.deleteTeam); // PENSAR EN SI BORRAR O NO LAS ESTADISTICAS DEL EQUIPO
// api.get('/api/getTeamStats/:teamId/competition/:competitionId', auth.checkAuth, teamCtrl.getTeamStats);
// // PLAYER
// api.post('/api/addPlayer', auth.checkAuth, playerCtrl.addPlayer);
// api.get('/api/getPlayersByTeamId/:teamId', auth.checkAuth, playerCtrl.getPlayersByTeamId);
// api.put('/api/updatePlayer/:id', auth.checkAuth, playerCtrl.updatePlayer);
// api.delete('/api/deletePlayer/:id', auth.checkAuth, playerCtrl.deletePlayer);

// // COMPETITIION
// api.post('/api/addCompetition', auth.checkAuth, competitionCtrl.addCompetition);
// api.get('/api/getCompetition/:id', auth.checkAuth, competitionCtrl.getCompetition);
// api.get('/api/getUserCompetitions/:id', auth.checkAuth, competitionCtrl.getUserCompetitions);
// api.put('/api/updateCompetition/:id', auth.checkAuth, competitionCtrl.updateCompetition);
// api.delete('/api/deleteCompetition/:id', auth.checkAuth, competitionCtrl.deleteCompetition);

// // ROUND
// api.post('/api/addRound', auth.checkAuth, roundCtrl.addRound);
// api.delete('/api/deleteRound/:id', auth.checkAuth, roundCtrl.deleteRound);
// api.get('/api/getCompetitionRounds/:id', auth.checkAuth, roundCtrl.getCompetitionRounds);

// // MATCH
// api.get('/api/getMatch/:matchId', auth.checkAuth, matchCtrl.getMatch);
// api.post('/api/addMatch', auth.checkAuth, matchCtrl.addMatch);
// api.put('/api/updateMatch/:id', auth.checkAuth, matchCtrl.updateMatch);
// api.delete('/api/deleteMatch/:id', auth.checkAuth, matchCtrl.deleteMatch);

// // MATCHPART
// api.post('/api/addMatchpart', auth.checkAuth, matchpartCtrl.addMatchpart);
// api.get('/api/getMatchpartsByMatchId/:matchId', auth.checkAuth, matchpartCtrl.getMatchpartsByMatchId);
// api.delete('/api/deleteMatchpart/:matchpartId', auth.checkAuth, matchpartCtrl.deleteMatchpart);

// // MINUTES
// api.get('/api/getMinutesByMatchId/:matchId', auth.checkAuth, minuteCtrl.getMinutesByMatchId);
// api.post('/api/addMinute', auth.checkAuth, minuteCtrl.addMinute);
// api.delete('/api/deleteMinute/:minuteId', auth.checkAuth, minuteCtrl.deleteMinute);

// // GOALS
// api.get('/api/getGoalsByMatchId/:matchId', auth.checkAuth, goalCtrl.getGoalsByMatchId);
// api.post('/api/addGoal', auth.checkAuth, goalCtrl.addGoal);
// api.delete('/api/deleteGoal/:goalId', auth.checkAuth, goalCtrl.deleteGoal);

// // ASSISTS
// api.get('/api/getAssistsByMatchId/:matchId', auth.checkAuth, assistCtrl.getAssistsByMatchId);
// api.post('/api/addAssist', auth.checkAuth, assistCtrl.addAssist);
// api.delete('/api/deleteAssist/:assistId', auth.checkAuth, assistCtrl.deleteAssist);

// // CARDS
// api.get('/api/getCardsByMatchId/:matchId', auth.checkAuth, cardCtrl.getCardsByMatchId);
// api.post('/api/addCard', auth.checkAuth, cardCtrl.addCard);
// api.delete('/api/deleteCard/:cardId', auth.checkAuth, cardCtrl.deleteCard);

// // SUBSTITUTIONS
// api.get('/api/getSubstitutionsByMatchId/:matchId', auth.checkAuth, substitutionCtrl.getSubstitutionsByMatchId);
// api.post('/api/addSubstitution', auth.checkAuth, substitutionCtrl.addSubstitution);
// api.delete('/api/deleteSubstitution/:substitutionId', auth.checkAuth, substitutionCtrl.deleteSubstitution);

export default api;
