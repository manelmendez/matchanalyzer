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

import { AssistModel } from '../dao-postgres/assist-service.js'
import { CardModel } from '../dao-postgres/card-service.js'
import { CompetitionModel } from '../dao-postgres/competition-service.js'
import { GoalModel } from '../dao-postgres/goal-service.js'
import { MatchModel } from '../dao-postgres/match-service.js'
import { MatchpartModel } from '../dao-postgres/matchpart-service.js'
import { MinuteModel } from '../dao-postgres/minute-service.js'
import { PlayerModel } from '../dao-postgres/player-service.js'
import { RoundModel } from '../dao-postgres/round-service.js'
import { SubstitutionModel } from '../dao-postgres/substitution-service.js'
import { TeamModel } from '../dao-postgres/team-service.js'
import { UserModel } from '../dao-postgres/user-service.js'

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
api.use(userRouter({ UserModel }))
// TEAM
api.use(teamRouter({ TeamModel, RoundModel, MatchModel, GoalModel, CardModel, PlayerModel }))
// PLAYER
api.use(playerRouter({ PlayerModel }))
// COMPETITIION
api.use(competitionRouter({ CompetitionModel, TeamModel, RoundModel, MatchModel }))
// ROUND
api.use(roundRouter({ RoundModel, MatchModel, TeamModel }))
// MATCH
api.use(matchRouter({ MatchModel }))
// MATCHPART
api.use(matchpartRouter({ MatchpartModel }))
// MINUTES
api.use(minuteRouter({ MinuteModel }))
// GOALS
api.use(goalRouter({ GoalModel, PlayerModel }))
// ASSISTS
api.use(assistRouter({ AssistModel }))
// CARDS
api.use(cardRouter({ CardModel, PlayerModel }))
// SUBSTITUTIONS
api.use(substitutionRouter({ SubstitutionModel }))

export default api
