import { Router } from 'express'
import { GoalController } from '../controllers/goalCtrl.js'
import { GoalService } from '../dao-postgres/goal-service.js'
import { PlayerService } from '../dao-postgres/player-service.js'
import auth from '../middlewares/auth.js'

export const goalRouter = (goalService: GoalService, playerService: PlayerService) => {
  const goalRouter = Router()

  const goalCtrl = new GoalController(goalService, playerService)

  goalRouter.get('/goals/match/:matchId', auth.checkAuth, goalCtrl.getGoalsByMatchId)
  goalRouter.post('/goals', auth.checkAuth, goalCtrl.addGoal)
  goalRouter.delete('/goals/:goalId', auth.checkAuth, goalCtrl.deleteGoal)

  return goalRouter
}
