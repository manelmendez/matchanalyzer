import con from '../adapters/postgres.js'
import { Minute } from '../models/minute.js'

export class MinuteService {
  findById = async (id: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM minutes WHERE id = $1 AND "userId" = $2',
      [id, userId]
    )
    return result.rows[0]
  }

  findByMatch = async (matchId: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM minutes WHERE "matchId" = $1 AND "userId" = $2',
      [matchId, userId]
    )
    return result.rows
  }

  saveMinute = async (minute: Minute) => {
    const result = await con.query(
      'INSERT INTO minutes("playerId", "matchpartId", "matchId", "roundId", "userId", position) ' +
      'VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
      [
        minute.playerId,
        minute.matchpartId,
        minute.matchId,
        minute.roundId,
        minute.userId,
        minute.position
      ]
    )
    return result.rows[0]
  }

  deleteMinute = async (id: number, userId: number) => {
    const result = await con.query(
      'DELETE FROM minutes WHERE id = $1 AND "userId"=$2 RETURNING *',
      [id, userId]
    )
    return result.rows[0].id
  }
}
