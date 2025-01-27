import { Router } from 'express'
import { RoundController } from '../controllers/roundCtrl.js'
import { RoundService } from '../dao-postgres/round-service.js'
import { MatchService } from '../dao-postgres/match-service.js'
import { TeamService } from '../dao-postgres/team-service.js'
import auth from '../middlewares/auth.js'

export const roundRouter = (roundService: RoundService, matchService: MatchService, teamService: TeamService) => {
  const roundRouter = Router()

  const roundCtrl = new RoundController(roundService, matchService, teamService)

  roundRouter.post('/rounds', auth.checkAuth, roundCtrl.addRound)
  roundRouter.delete('/rounds/:id', auth.checkAuth, roundCtrl.deleteRound)
  roundRouter.get('/rounds/competition/:id', auth.checkAuth, roundCtrl.getCompetitionRounds)

  return roundRouter
}
