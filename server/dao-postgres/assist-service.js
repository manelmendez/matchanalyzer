import con from '../config/postgres.js'

export class AssistModel {
  static findById = async ({ id, userId }) => {
    const result = await con.query(
      'SELECT * FROM assists WHERE id = $1 AND "userId" = $2',
      [id, userId]
    )
    return result.rows[0]
  }

  static findByMatch = async ({ matchId, userId }) => {
    const result = await con.query(
      'SELECT * FROM assists WHERE "matchId" = $1 AND "userId" = $2',
      [matchId, userId]
    )
    return result.rows
  }

  static saveAssist = async ({ assist }) => {
    const result = await con.query(
      'INSERT INTO assists(type, goal, "matchId", matchpart, "roundId", player, "userId") ' +
      'VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [
        assist.type,
        assist.goal,
        assist.matchId,
        assist.matchpart,
        assist.roundId,
        assist.player,
        assist.userId
      ]
    )
    return result.rows[0]
  }

  static deleteAssist = async ({ assistId, userId }) => {
    const result = await con.query(
      'DELETE FROM assists WHERE id = $1 AND "userId"=$2 RETURNING *',
      [assistId, userId]
    )
    return result.rows[0].id
  }
}
