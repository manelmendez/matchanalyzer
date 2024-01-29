import { Router } from 'express'
import { RoundController } from '../controllers/roundCtrl.js'
import auth from '../middlewares/auth.js'

export const roundRouter = ({ RoundModel, MatchModel, TeamModel }) => {
  const roundRouter = Router()

  const roundCtrl = new RoundController({ RoundModel, MatchModel, TeamModel })

  roundRouter.post('/rounds', auth.checkAuth, roundCtrl.addRound)
  roundRouter.delete('/rounds/:id', auth.checkAuth, roundCtrl.deleteRound)
  roundRouter.get('/rounds/competition/:id', auth.checkAuth, roundCtrl.getCompetitionRounds)

  return roundRouter
}
