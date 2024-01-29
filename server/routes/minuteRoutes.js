import { Router } from 'express'
import { MinuteController } from '../controllers/minuteCtrl.js'
import auth from '../middlewares/auth.js'

export const minuteRouter = ({ MinuteModel }) => {
  const minuteRouter = Router()

  const minuteCtrl = new MinuteController({ MinuteModel })

  minuteRouter.get('/minutes/match/:matchId', auth.checkAuth, minuteCtrl.getMinutesByMatchId)
  minuteRouter.post('/minutes', auth.checkAuth, minuteCtrl.addMinute)
  minuteRouter.delete('/minutes/:minuteId', auth.checkAuth, minuteCtrl.deleteMinute)

  return minuteRouter
}
