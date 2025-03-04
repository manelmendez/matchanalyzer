import con from '../adapters/postgres.js'
import { CalendarEvent } from '../models/calendarEvent'
import errorHelper from '../utils/errorHelper.js'
export class CalendarService {
  findByUser = async (userId: number) => {
    const result = await con.query(
      'SELECT * FROM calendar WHERE "userId" = $1',
      [userId]
    )
    return result.rows
  }

  saveCalendarEvent = async (calendarEvent: CalendarEvent) => {
    try {
      const result = await con.query(
        'INSERT INTO calendar(title, description, start, "end", location, "userId") ' +
        'VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
        [
          calendarEvent.title,
          calendarEvent.description,
          calendarEvent.start,
          calendarEvent.end,
          calendarEvent.location,
          calendarEvent.userId
        ]
      )
      return result.rows[0]
    } catch (err) {
      console.log(err)
      errorHelper.internalServerError('Error al guardar en la base de datos')
    }
  }

  updateCalendarEvent = async (event: CalendarEvent, userId: number) => {
    try {
      const result = await con.query(
        'UPDATE calendar SET title=$1, description=$2, start=$3, "end"=$4, location=$5 ' +
        'WHERE id=$6 AND "userId"=$7 RETURNING *',
        [event.title, event.description, event.start, event.end, event.location, event.id, userId]
      )
      return result.rows[0]
    }
    catch (err) {
      console.log(err);
      errorHelper.internalServerError("Error al actualizar en la base de datos")
    }
  }

  deleteCalendarEvent = async (id: number, userId: number) => {
    const result = await con.query(
      'DELETE FROM calendar WHERE id = $1 AND "userId"=$2 RETURNING *',
      [id, userId]
    )
    return result.rows[0].id
  }
}
