import { Router } from 'express'
import { MatchController } from '../controllers/matchCtrl.js'
import auth from '../middlewares/auth.js'

export const matchRouter = ({ MatchModel }) => {
  const matchRouter = Router()

  const matchCtrl = new MatchController({ MatchModel })

  matchRouter.get('/matches/:matchId', auth.checkAuth, matchCtrl.getMatch)
  matchRouter.post('/matches', auth.checkAuth, matchCtrl.addMatch)
  matchRouter.put('/matches/:id', auth.checkAuth, matchCtrl.updateMatch)
  matchRouter.delete('/matches/:id', auth.checkAuth, matchCtrl.deleteMatch)

  return matchRouter
}
