const express = require('express')
// const oauth2Ctrl = require('../controllers/oauth2Ctrl')
const userCtrl = require('../controllers/userCtrl')
const teamCtrl = require('../controllers/teamCtrl')
const playerCtrl = require('../controllers/playerCtrl')
const competitionCtrl = require('../controllers/competitionCtrl')
const roundCtrl = require('../controllers/roundCtrl')
const matchCtrl = require('../controllers/matchCtrl')
const matchpartCtrl = require('../controllers/matchpartCtrl')
const minuteCtrl = require('../controllers/minuteCtrl')
const goalCtrl = require('../controllers/goalCtrl')
const assistCtrl = require('../controllers/assistCtrl')
const cardCtrl = require('../controllers/cardCtrl')
const substitutionCtrl = require('../controllers/substitutionCtrl')
// const teamStatsCtrl = require('../controllers/teamStatsCtrl')
const imageServices = require('../services/image-services')
const auth = require('../middlewares/auth')
const api = express.Router()

// AUTH
api.post('/private', auth.isAuth)

// OAUTH2
// api.get('/oauth/google', oauth2Ctrl.verifyGoogleToken)

// IMAGES
api.post('/uploadImage', imageServices.uploadImage)

// USER
api.post('/signUp', userCtrl.signUp)
api.post('/signIn', userCtrl.signIn)
api.get('/getUser/:id', auth.checkAuth, userCtrl.getUser)
api.get('/getAllUsers', auth.checkAuth, userCtrl.getAllUsers)

// TEAM
api.post('/addTeam', auth.checkAuth, teamCtrl.addTeam)
api.get('/getTeam/:id', auth.checkAuth, teamCtrl.getTeam)
api.get('/getUserTeams/:userId', auth.checkAuth, teamCtrl.getUserTeams)
api.post('/addNoManagerTeam', auth.checkAuth, teamCtrl.addNoManagerTeam)
api.put('/updateTeam/:id', auth.checkAuth, teamCtrl.updateTeam)
api.delete('/deleteTeam/:id', auth.checkAuth, teamCtrl.deleteTeam) // PENSAR EN SI BORRAR O NO LAS ESTADISTICAS DEL EQUIPO
api.get('/getTeamStats/:teamId/competition/:competitionId', auth.checkAuth, teamCtrl.getTeamStats)
// PLAYER
api.post('/addPlayer', auth.checkAuth, playerCtrl.addPlayer)
api.put('/updatePlayer/:id', auth.checkAuth, playerCtrl.updatePlayer)
api.delete('/deletePlayer/:id', auth.checkAuth, playerCtrl.deletePlayer)

// COMPETITIION
api.post('/addCompetition', auth.checkAuth, competitionCtrl.addCompetition)
api.get('/getCompetition/:id', auth.checkAuth, competitionCtrl.getCompetition)
api.get('/getUserCompetitions/:id', auth.checkAuth, competitionCtrl.getUserCompetitions)
api.put('/updateCompetition/:id', auth.checkAuth, competitionCtrl.updateCompetition)
api.delete('/deleteCompetition/:id', auth.checkAuth, competitionCtrl.deleteCompetition)

// ROUND
api.post('/addRound', auth.checkAuth, roundCtrl.addRound)
api.delete('/deleteRound/:id', auth.checkAuth, roundCtrl.deleteRound)
api.get('/getCompetitionRounds/:id', auth.checkAuth, roundCtrl.getCompetitionRounds)

// MATCH
api.post('/addMatch', auth.checkAuth, matchCtrl.addMatch)
api.put('/updateMatch/:id', auth.checkAuth, matchCtrl.updateMatch)
api.delete('/deleteMatch/:id', auth.checkAuth, matchCtrl.deleteMatch)

// MATCHPART
api.post('/addMatchpart', auth.checkAuth, matchpartCtrl.addMatchpart)
api.get('/getMatchpartsByMatchId/:matchId', auth.checkAuth, matchpartCtrl.getMatchpartsByMatchId)
api.delete('/deleteMatchpart/:matchpartId', auth.checkAuth, matchpartCtrl.deleteMatchpart)

// MINUTES
api.get('/getMinutesByMatchId/:matchId', auth.checkAuth, minuteCtrl.getMinutesByMatchId)
api.post('/addMinute', auth.checkAuth, minuteCtrl.addMinute)
api.delete('/deleteMinute/:minuteId', auth.checkAuth, minuteCtrl.deleteMinute)

// GOALS
api.get('/getGoalsByMatchId/:matchId', auth.checkAuth, goalCtrl.getGoalsByMatchId)
api.post('/addGoal', auth.checkAuth, goalCtrl.addGoal)
api.delete('/deleteGoal/:goalId', auth.checkAuth, goalCtrl.deleteGoal)

// ASSISTS
api.get('/getAssistsByMatchId/:matchId', auth.checkAuth, assistCtrl.getAssistsByMatchId)
api.post('/addAssist', auth.checkAuth, assistCtrl.addAssist)
api.delete('/deleteAssist/:assistId', auth.checkAuth, assistCtrl.deleteAssist)

// CARDS
api.get('/getCardsByMatchId/:matchId', auth.checkAuth, cardCtrl.getCardsByMatchId)
api.post('/addCard', auth.checkAuth, cardCtrl.addCard)
api.delete('/deleteCard/:cardId', auth.checkAuth, cardCtrl.deleteCard)

// SUBSTITUTIONS
api.get('/getSubstitutionsByMatchId/:matchId', auth.checkAuth, substitutionCtrl.getSubstitutionsByMatchId)
api.post('/addSubstitution', auth.checkAuth, substitutionCtrl.addSubstitution)
api.delete('/deleteSubstitution/:substitutionId', auth.checkAuth, substitutionCtrl.deleteSubstitution)

module.exports = api
