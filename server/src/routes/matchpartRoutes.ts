import { Router } from 'express'
import { MatchpartController } from '../controllers/matchpartCtrl.js'
import { MatchpartService } from '../dao-postgres/matchpart-service.js'
import auth from '../middlewares/auth.js'

export const matchpartRouter = (matchpartService: MatchpartService) => {
  const matchpartRouter = Router()

  const matchpartCtrl = new MatchpartController(matchpartService)

  matchpartRouter.post('/matchparts', auth.checkAuth, matchpartCtrl.addMatchpart)
  matchpartRouter.get('/matchparts/match/:matchId', auth.checkAuth, matchpartCtrl.getMatchpartsByMatchId)
  matchpartRouter.delete('/matchparts/:matchpartId', auth.checkAuth, matchpartCtrl.deleteMatchpart)

  return matchpartRouter
}
