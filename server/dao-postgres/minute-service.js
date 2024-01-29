import con from '../config/postgres.js'

export class MinuteModel {
  static findById = async ({ id, userId }) => {
    const result = await con.query(
      'SELECT * FROM minutes WHERE id = $1 AND "userId" = $2',
      [id, userId]
    )
    return result.rows[0]
  }

  static findByMatch = async ({ matchId, userId }) => {
    const result = await con.query(
      'SELECT * FROM minutes WHERE "matchId" = $1 AND "userId" = $2',
      [matchId, userId]
    )
    return result.rows
  }

  static saveMinute = async ({ minute }) => {
    const result = await con.query(
      'INSERT INTO minutes(player, matchpart, "matchId", "roundId", "userId", position) ' +
      'VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
      [
        minute.player,
        minute.matchpart,
        minute.matchId,
        minute.roundId,
        minute.userId,
        minute.position
      ]
    )
    return result.rows[0]
  }

  static deleteMinute = async ({ id, userId }) => {
    const result = await con.query(
      'DELETE FROM minutes WHERE id = $1 AND "userId"=$2 RETURNING *',
      [id, userId]
    )
    return result.rows[0].id
  }
}
