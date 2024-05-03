import { Router } from 'express'
import { CompetitionController } from '../controllers/competitionCtrl.js'
import { CompetitionService } from '../dao-postgres/competition-service.js'
import { TeamService } from '../dao-postgres/team-service.js'
import { RoundService } from '../dao-postgres/round-service.js'
import { MatchService } from '../dao-postgres/match-service.js'
import auth from '../middlewares/auth.js'

export const competitionRouter = (competitionService: CompetitionService, teamService: TeamService, roundService: RoundService, matchService: MatchService) => {
  const competitionRouter = Router()

  const competitionCtrl = new CompetitionController(competitionService, teamService, roundService, matchService)

  competitionRouter.post('/competitions', auth.checkAuth, competitionCtrl.addCompetition)
  competitionRouter.get('/competitions/:id', auth.checkAuth, competitionCtrl.getCompetition)
  competitionRouter.get('/competitions/user/:id', auth.checkAuth, competitionCtrl.getUserCompetitions)
  competitionRouter.put('/competitions/:id', auth.checkAuth, competitionCtrl.updateCompetition)
  competitionRouter.delete('/competitions/:id', auth.checkAuth, competitionCtrl.deleteCompetition)

  return competitionRouter
}
