import { Router } from 'express'
import { MinuteController } from '../controllers/minuteCtrl.js'
import { MinuteService } from '../dao-postgres/minute-service.js'
import auth from '../middlewares/auth.js'

export const minuteRouter = (minuteService: MinuteService) => {
  const minuteRouter = Router()

  const minuteCtrl = new MinuteController(minuteService)

  minuteRouter.get('/minutes/match/:matchId', auth.checkAuth, minuteCtrl.getMinutesByMatchId)
  minuteRouter.post('/minutes', auth.checkAuth, minuteCtrl.addMinute)
  minuteRouter.delete('/minutes/:minuteId', auth.checkAuth, minuteCtrl.deleteMinute)

  return minuteRouter
}
