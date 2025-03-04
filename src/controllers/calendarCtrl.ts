import { NextFunction, Request, Response } from 'express'
import { CalendarService } from '../dao-postgres/calendar-service'
import { CalendarEvent } from '../models/calendarEvent.js'
import errorHelper from '../utils/errorHelper.js'
import moment from 'moment-timezone'

export class CalendarController {
  private calendarService: CalendarService
  constructor(calendarService: CalendarService) {
    this.calendarService = calendarService
  }

  addEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return errorHelper.unauthorizedError('No userId provided in Auth')
      }
      const userId: number = req.user?.id as number
      const eventToSave: CalendarEvent = {
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        location: req.body.location,
        userId
      }
      try {
        const event = await this.calendarService.saveCalendarEvent(eventToSave)
        const start = moment(event.start).tz('Europe/Madrid').format('YYYY-MM-DD HH:mm');
        const end = moment(event.end).tz('Europe/Madrid').format('YYYY-MM-DD HH:mm');
        event.start = start
        event.end = end
        res.status(200).send({
          event,
          message: "Evento creado correctamente"
        })
      } catch (error) {
        console.log(error)
        errorHelper.internalServerError('Error al añadir evento')
      }
    }
    catch (error) {
      next(error)
    }
  }

  updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return errorHelper.unauthorizedError('No userId provided in Auth')
      }
      const userId: number = req.user?.id as number
      const eventToUpdate: CalendarEvent = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        location: req.body.location,
        userId
      }
      try {
        const event = await this.calendarService.updateCalendarEvent(eventToUpdate, userId)
        const start = moment(event.start).tz('Europe/Madrid').format('YYYY-MM-DD HH:mm');
        const end = moment(event.end).tz('Europe/Madrid').format('YYYY-MM-DD HH:mm');
        event.start = start
        event.end = end
        res.status(200).send({
          event,
          message: "Evento editado correctamente"
        })
      } catch (error) {
        console.log(error)
        errorHelper.internalServerError('Error al actualizar evento')
      }
    }
    catch (error) {
      next(error)
    }
  }

  getUserEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return errorHelper.unauthorizedError('No userId provided in Auth')
      }
      const userId: number = req.user.id
      const events = await this.calendarService.findByUser(userId)
      try {
        for (const event of events) {
          const start = moment(event.start).tz('Europe/Madrid').format('YYYY-MM-DD HH:mm');
          const end = moment(event.end).tz('Europe/Madrid').format('YYYY-MM-DD HH:mm');
          event.start = start
          event.end = end
        }
        res.status(200).send({
          events
        })
      } catch (error) {
        console.log(error)
        errorHelper.internalServerError('Error al obtener eventos')
      }
    }
    catch (error) {
      next(error)
    }
  }

  deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return errorHelper.unauthorizedError('No userId provided in Auth')
      }
      const userId: number = req.user.id
      const eventId: number = parseInt(req.params.eventId)
      try {
        const eventDeleted = await this.calendarService.deleteCalendarEvent(eventId, userId)
        res.status(200).send({
          eventDeleted
        })
      } catch (error) {
        console.log(error)
        errorHelper.internalServerError('Error al borrar evento')
      }
    }
    catch (error) {
      next(error)
    }
  }
}