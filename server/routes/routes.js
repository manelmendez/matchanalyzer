import express from 'express'
// const oauth2Ctrl = require('../controllers/oauth2Ctrl')
import userCtrl from '../controllers/userCtrl.js'
import teamCtrl from '../controllers/teamCtrl.js'
import playerCtrl from '../controllers/playerCtrl.js'
import competitionCtrl from '../controllers/competitionCtrl.js'
import roundCtrl from '../controllers/roundCtrl.js'
import matchCtrl from '../controllers/matchCtrl.js'
import matchpartCtrl from '../controllers/matchpartCtrl.js'
import minuteCtrl from '../controllers/minuteCtrl.js'
import goalCtrl from '../controllers/goalCtrl.js'
import assistCtrl from '../controllers/assistCtrl.js'
import cardCtrl from '../controllers/cardCtrl.js'
import substitutionCtrl from '../controllers/substitutionCtrl.js'
import imageServices from '../services/image-services.js'
import auth from '../middlewares/auth.js'
const api = express.Router()

// AUTH
api.post('/private', auth.isAuth)

// OAUTH2
// api.get('/oauth/google', oauth2Ctrl.verifyGoogleToken)

// IMAGES
api.post('/images', imageServices.uploadImage)

// USER
api.post('/users', userCtrl.signUp)
api.post('/users/signin', userCtrl.signIn)
api.get('/users/:id', auth.checkAuth, userCtrl.getUser)
api.get('/users', auth.checkAuth, userCtrl.getAllUsers)
api.put('/users/:id', auth.checkAdmin, userCtrl.updateUser)
api.delete('/users/:id', auth.checkAdmin, userCtrl.deleteUser)

// TEAM
api.post('/teams', auth.checkAuth, teamCtrl.addTeam)
api.get('/teams/:id', auth.checkAuth, teamCtrl.getTeam)
api.get('/teams/user/:userId', auth.checkAuth, teamCtrl.getUserTeams)
api.post('/teams/no-manager', auth.checkAuth, teamCtrl.addNoManagerTeam)
api.put('/teams/:id', auth.checkAuth, teamCtrl.updateTeam)
api.delete('/teams/:id', auth.checkAuth, teamCtrl.deleteTeam) // PENSAR EN SI BORRAR O NO LAS ESTADISTICAS DEL EQUIPO
api.get(
  '/teams/:teamId/competition/:competitionId',
  auth.checkAuth,
  teamCtrl.getTeamStats
)
// api.get(
//   '/teams/:id/competition/:competitionId/pichihi',
//   auth.checkAuth,
//   teamCtrl.getTeamScorers
// )

// PLAYER
api.post('/players', auth.checkAuth, playerCtrl.addPlayer)
api.get('/players/team/:teamId', auth.checkAuth, playerCtrl.getPlayersByTeamId)
api.put('/players/:id', auth.checkAuth, playerCtrl.updatePlayer)
api.delete('/players/:id', auth.checkAuth, playerCtrl.deletePlayer)

// COMPETITIION
api.post('/competitions', auth.checkAuth, competitionCtrl.addCompetition)
api.get('/competitions/:id', auth.checkAuth, competitionCtrl.getCompetition)
api.get(
  '/competitions/user/:id',
  auth.checkAuth,
  competitionCtrl.getUserCompetitions
)
api.put('/competitions/:id', auth.checkAuth, competitionCtrl.updateCompetition)
api.delete(
  '/competitions/:id',
  auth.checkAuth,
  competitionCtrl.deleteCompetition
)

// ROUND
api.post('/rounds', auth.checkAuth, roundCtrl.addRound)
api.delete('/rounds/:id', auth.checkAuth, roundCtrl.deleteRound)
api.get(
  '/rounds/competition/:id',
  auth.checkAuth,
  roundCtrl.getCompetitionRounds
)

// MATCH
api.get('/matches/:matchId', auth.checkAuth, matchCtrl.getMatch)
api.post('/matches', auth.checkAuth, matchCtrl.addMatch)
api.put('/matches/:id', auth.checkAuth, matchCtrl.updateMatch)
api.delete('/matches/:id', auth.checkAuth, matchCtrl.deleteMatch)

// MATCHPART
api.post('/matchparts', auth.checkAuth, matchpartCtrl.addMatchpart)
api.get(
  '/matchparts/match/:matchId',
  auth.checkAuth,
  matchpartCtrl.getMatchpartsByMatchId
)
api.delete(
  '/matchparts/:matchpartId',
  auth.checkAuth,
  matchpartCtrl.deleteMatchpart
)

// MINUTES
api.get(
  '/minutes/match/:matchId',
  auth.checkAuth,
  minuteCtrl.getMinutesByMatchId
)
api.post('/minutes', auth.checkAuth, minuteCtrl.addMinute)
api.delete('/minutes/:minuteId', auth.checkAuth, minuteCtrl.deleteMinute)

// GOALS
api.get('/goals/match/:matchId', auth.checkAuth, goalCtrl.getGoalsByMatchId)
api.post('/goals', auth.checkAuth, goalCtrl.addGoal)
api.delete('/goals/:goalId', auth.checkAuth, goalCtrl.deleteGoal)

// ASSISTS
api.get(
  '/assists/match/:matchId',
  auth.checkAuth,
  assistCtrl.getAssistsByMatchId
)
api.post('/assists', auth.checkAuth, assistCtrl.addAssist)
api.delete('/assists/:assistId', auth.checkAuth, assistCtrl.deleteAssist)

// CARDS
api.get('/cards/match/:matchId', auth.checkAuth, cardCtrl.getCardsByMatchId)
api.post('/cards', auth.checkAuth, cardCtrl.addCard)
api.delete('/cards/:cardId', auth.checkAuth, cardCtrl.deleteCard)

// SUBSTITUTIONS
api.get(
  '/substitutions/match/:matchId',
  auth.checkAuth,
  substitutionCtrl.getSubstitutionsByMatchId
)
api.post('/substitutions', auth.checkAuth, substitutionCtrl.addSubstitution)
api.delete(
  '/substitutions/:substitutionId',
  auth.checkAuth,
  substitutionCtrl.deleteSubstitution
)

export default api
