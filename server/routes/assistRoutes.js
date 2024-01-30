import { Router } from 'express'
import { AssistController } from '../controllers/assistCtrl.js'
import auth from '../middlewares/auth.js'

export const assistRouter = ({ AssistModel }) => {
  const assistRouter = Router()

  const assistCtrl = new AssistController({ AssistModel })

  assistRouter.get('/assists/match/:matchId', auth.checkAuth, assistCtrl.getAssistsByMatchId)
  assistRouter.post('/assists', auth.checkAuth, assistCtrl.addAssist)
  assistRouter.delete('/assists/:assistId', auth.checkAuth, assistCtrl.deleteAssist)

  return assistRouter
}
