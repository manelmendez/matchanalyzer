import con from '../config/postgres.js'

export class GoalModel {
  static findById = async ({ id, userId }) => {
    const result = await con.query(
      'SELECT * FROM goals WHERE id = $1 AND "userId" = $2',
      [id, userId]
    )
    return result.rows[0]
  }

  static findByMatch = async ({ matchId, userId }) => {
    const result = await con.query(
      'SELECT * FROM goals WHERE "matchId" = $1 AND "userId" = $2',
      [matchId, userId]
    )
    return result.rows
  }

  static findByPlayer = async ({ playerId, userId }) => {
    const result = await con.query(
      'SELECT * FROM goals WHERE player = $1 AND "userId" = $2',
      [playerId, userId]
    )
    return result.rows
  }

  static saveGoal = async ({ goal }) => {
    const result = await con.query(
      'INSERT INTO goals(minute, type, player, "matchId", "roundId", "userId", matchpart) ' +
      'VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [
        goal.minute,
        goal.type,
        goal.player,
        goal.matchId,
        goal.roundId,
        goal.userId,
        goal.matchpart
      ]
    )
    return result.rows[0]
  }

  static deleteGoal = async ({ id, userId }) => {
    const result = await con.query(
      'DELETE FROM goals WHERE id = $1 AND "userId"=$2 RETURNING *',
      [id, userId]
    )
    return result.rows[0].id
  }
}
