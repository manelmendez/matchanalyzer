import { Router } from 'express'
import { CalendarController } from '../controllers/calendarCtrl.js'
import { CalendarService } from '../dao-postgres/calendar-service.js'
import auth from '../middlewares/auth.js'

export const calendarRouter = (calendarService: CalendarService) => {
  const calendarRouter = Router()

  const calendarCtrl = new CalendarController(calendarService)

  calendarRouter.get('/calendar', auth.checkAuth, calendarCtrl.getUserEvents)
  calendarRouter.post('/calendar', auth.checkAuth, calendarCtrl.addEvent)
  calendarRouter.put('/calendar/:calendarId', auth.checkAuth, calendarCtrl.updateEvent)
  calendarRouter.delete('/calendar/:calendarId', auth.checkAuth, calendarCtrl.deleteEvent)

  return calendarRouter
}
