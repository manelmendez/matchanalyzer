const express = require('express')
// const oauth2Ctrl = require('../controllers/oauth2Ctrl')
const userCtrl = require('../controllers/userCtrl')
const teamCtrl = require('../controllers/teamCtrl')
const playerCtrl = require('../controllers/playerCtrl')
const competitionCtrl = require('../controllers/competitionCtrl')
const roundCtrl = require('../controllers/roundCtrl')
const matchCtrl = require('../controllers/matchCtrl')
const matchpartCtrl = require('../controllers/matchpartCtrl')
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
api.post('/addMatchparts', auth.checkAuth, matchpartCtrl.addMatchparts)
api.get('/getMatchpartsByMatchId/:matchId', auth.checkAuth, matchpartCtrl.getMatchpartsByMatchId)
module.exports = api
