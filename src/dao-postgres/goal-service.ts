import con from '../adapters/postgres.js'
import { Goal } from '../models/goal.js'

export class GoalService {
  findById = async (id: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM goals WHERE id = $1 AND "userId" = $2',
      [id, userId]
    )
    return result.rows[0]
  }

  findByMatch = async (matchId: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM goals WHERE "matchId" = $1 AND "userId" = $2',
      [matchId, userId]
    )
    return result.rows
  }

  findByPlayer = async (playerId: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM goals WHERE "playerId" = $1 AND "userId" = $2',
      [playerId, userId]
    )
    return result.rows
  }

  saveGoal = async (goal: Goal) => {
    const result = await con.query(
      'INSERT INTO goals(minute, type, "playerId", "matchId", "roundId", "userId", "matchpartId") ' +
      'VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [
        goal.minute,
        goal.type,
        goal.playerId,
        goal.matchId,
        goal.roundId,
        goal.userId,
        goal.matchpartId
      ]
    )
    return result.rows[0]
  }

  deleteGoal = async (id: number, userId: number) => {
    const result = await con.query(
      'DELETE FROM goals WHERE id = $1 AND "userId"=$2 RETURNING *',
      [id, userId]
    )
    return result.rows[0].id
  }
}
