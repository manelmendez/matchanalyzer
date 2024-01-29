import { Router } from 'express'
import { GoalController } from '../controllers/goalCtrl.js'
import auth from '../middlewares/auth.js'

export const goalRouter = ({ GoalModel, PlayerModel }) => {
  const goalRouter = Router()

  const goalCtrl = new GoalController({ GoalModel, PlayerModel })

  goalRouter.get('/goals/match/:matchId', auth.checkAuth, goalCtrl.getGoalsByMatchId)
  goalRouter.post('/goals', auth.checkAuth, goalCtrl.addGoal)
  goalRouter.delete('/goals/:goalId', auth.checkAuth, goalCtrl.deleteGoal)

  return goalRouter
}
