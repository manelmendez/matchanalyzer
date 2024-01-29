import con from '../config/postgres.js'

export class MatchpartModel {
  static findByMatch = async ({ matchId, userId }) => {
    const result = await con.query(
      'SELECT * FROM matchparts WHERE "matchId" = $1 AND "userId" = $2',
      [matchId, userId]
    )
    return result.rows
  }

  static findByRound = async ({ ids, userId }) => {
    const result = await con.query(
      'SELECT * FROM matchparts WHERE round = $1 AND "userId" = $2',
      [ids, userId]
    )
    return result.rows
  }

  static saveMatchpart = async ({ matchpart }) => {
    const result = await con.query(
      'INSERT INTO matchparts("matchId", formation, time, team, "roundId", "userId") ' +
      'VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
      [
        matchpart.matchId,
        matchpart.formation,
        matchpart.time,
        matchpart.team,
        matchpart.roundId,
        matchpart.userId
      ]
    )
    return result.rows[0]
  }

  static updateMatchpart = async ({ matchpart, id, userId }) => {
    const result = await con.query(
      'UPDATE matchparts SET formation=$1, time=$2  WHERE id=$3 AND "userId"=$4 RETURNING *',
      [matchpart.formation, matchpart.time, id, userId]
    )
    return result.rows[0]
  }

  static deleteMatchpart = async ({ id, userId }) => {
    const result = await con.query(
      'DELETE FROM matchparts WHERE id = $1 AND "userId" = $2 RETURNING *',
      [id, userId]
    )
    return result.rows[0].id
  }
}
