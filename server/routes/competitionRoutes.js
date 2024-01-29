import { Router } from 'express'
import { CompetitionController } from '../controllers/competitionCtrl.js'
import auth from '../middlewares/auth.js'

export const competitionRouter = ({ CompetitionModel, TeamModel, RoundModel, MatchModel }) => {
  const competitionRouter = Router()

  const competitionCtrl = new CompetitionController({ CompetitionModel, TeamModel, RoundModel, MatchModel })

  competitionRouter.post('/competitions', auth.checkAuth, competitionCtrl.addCompetition)
  competitionRouter.get('/competitions/:id', auth.checkAuth, competitionCtrl.getCompetition)
  competitionRouter.get('/competitions/user/:id', auth.checkAuth, competitionCtrl.getUserCompetitions)
  competitionRouter.put('/competitions/:id', auth.checkAuth, competitionCtrl.updateCompetition)
  competitionRouter.delete('/competitions/:id', auth.checkAuth, competitionCtrl.deleteCompetition)

  return competitionRouter
}
