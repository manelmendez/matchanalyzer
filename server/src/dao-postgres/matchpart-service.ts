import con from '../config/postgres.js'
import { MatchPart } from '../models/matchpart.js'

export class MatchpartService {
  findByMatch = async (matchId: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM matchparts WHERE "matchId" = $1 AND "userId" = $2',
      [matchId, userId]
    )
    return result.rows
  }

  findByRound = async (ids:number[], userId: number) => {
    const result = await con.query(
      'SELECT * FROM matchparts WHERE round = $1 AND "userId" = $2',
      [ids, userId]
    )
    return result.rows
  }

  saveMatchpart = async (matchpart: MatchPart) => {
    const result = await con.query(
      'INSERT INTO matchparts("matchId", formation, time, "teamId", "roundId", "userId") ' +
      'VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
      [
        matchpart.matchId,
        matchpart.formation,
        matchpart.time,
        matchpart.teamId,
        matchpart.roundId,
        matchpart.userId
      ]
    )
    return result.rows[0]
  }

  updateMatchpart = async (matchpart: MatchPart, id: number, userId: number) => {
    const result = await con.query(
      'UPDATE matchparts SET formation=$1, time=$2  WHERE id=$3 AND "userId"=$4 RETURNING *',
      [matchpart.formation, matchpart.time, id, userId]
    )
    return result.rows[0]
  }

  deleteMatchpart = async (id: number, userId: number) => {
    const result = await con.query(
      'DELETE FROM matchparts WHERE id = $1 AND "userId" = $2 RETURNING *',
      [id, userId]
    )
    return result.rows[0].id
  }
}
