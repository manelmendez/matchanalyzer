import express from 'express'
// const oauth2Ctrl = require('../controllers/oauth2Ctrl')
import { assistRouter } from './assistRoutes.js'
import { cardRouter } from './cardRoutes.js'
import { competitionRouter } from './competitionRoutes.js'
import { goalRouter } from './goalRoutes.js'
import { matchRouter } from './matchRoutes.js'
import { matchpartRouter } from './matchpartRoutes.js'
import { minuteRouter } from './minuteRoutes.js'
import { playerRouter } from './playerRoutes.js'
import { roundRouter } from './roundRouter.js'
import { substitutionRouter } from './substitutionRouter.js'
import { teamRouter } from './teamRoutes.js'
import { userRouter } from './userRoutes.js'

import { AssistService } from '../dao-postgres/assist-service.js'
import { CardService } from '../dao-postgres/card-service.js'
import { CompetitionService } from '../dao-postgres/competition-service.js'
import { GoalService } from '../dao-postgres/goal-service.js'
import { MatchService } from '../dao-postgres/match-service.js'
import { MatchpartService } from '../dao-postgres/matchpart-service.js'
import { MinuteService } from '../dao-postgres/minute-service.js'
import { PlayerService } from '../dao-postgres/player-service.js'
import { RoundService } from '../dao-postgres/round-service.js'
import { SubstitutionService } from '../dao-postgres/substitution-service.js'
import { TeamService } from '../dao-postgres/team-service.js'
import { UserService } from '../dao-postgres/user-service.js'

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
api.use(userRouter(new UserService))
// TEAM
api.use(teamRouter(new TeamService, new RoundService, new MatchService, new GoalService, new CardService, new PlayerService))
// PLAYER
api.use(playerRouter(new PlayerService))
// COMPETITIION
api.use(competitionRouter(new CompetitionService, new TeamService, new RoundService, new MatchService))
// ROUND
api.use(roundRouter(new RoundService, new MatchService, new TeamService))
// MATCH
api.use(matchRouter(new MatchService))
// MATCHPART
api.use(matchpartRouter(new MatchpartService))
// MINUTES
api.use(minuteRouter(new MinuteService))
// GOALS
api.use(goalRouter(new GoalService, new PlayerService))
// ASSISTS
api.use(assistRouter(new AssistService))
// CARDS
api.use(cardRouter(new CardService, new PlayerService))
// SUBSTITUTIONS
api.use(substitutionRouter(new SubstitutionService))

export default api
