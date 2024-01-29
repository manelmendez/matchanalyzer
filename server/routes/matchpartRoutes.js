import { Router } from 'express'
import { MatchpartController } from '../controllers/matchpartCtrl.js'
import auth from '../middlewares/auth.js'

export const matchpartRouter = ({ MatchpartModel }) => {
  const matchpartRouter = Router()

  const matchpartCtrl = new MatchpartController({ MatchpartModel })

  matchpartRouter.post('/matchparts', auth.checkAuth, matchpartCtrl.addMatchpart)
  matchpartRouter.get('/matchparts/match/:matchId', auth.checkAuth, matchpartCtrl.getMatchpartsByMatchId)
  matchpartRouter.delete('/matchparts/:matchpartId', auth.checkAuth, matchpartCtrl.deleteMatchpart)

  return matchpartRouter
}
