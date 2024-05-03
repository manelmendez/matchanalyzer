import { Router } from 'express'
import { MatchController } from '../controllers/matchCtrl.js'
import { MatchService } from '../dao-postgres/match-service.js'
import auth from '../middlewares/auth.js'

export const matchRouter = (matchService: MatchService) => {
  const matchRouter = Router()

  const matchCtrl = new MatchController(matchService)

  matchRouter.get('/matches/:matchId', auth.checkAuth, matchCtrl.getMatch)
  matchRouter.post('/matches', auth.checkAuth, matchCtrl.addMatch)
  matchRouter.put('/matches/:id', auth.checkAuth, matchCtrl.updateMatch)
  matchRouter.delete('/matches/:id', auth.checkAuth, matchCtrl.deleteMatch)

  return matchRouter
}
