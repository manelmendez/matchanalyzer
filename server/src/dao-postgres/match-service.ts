import con from '../config/postgres.js'
import { Match } from '../models/match.js'

export class MatchService {
  findById = async (id: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM matches WHERE id = $1 AND "userId" = $2',
      [id, userId]
    )
    return result.rows[0]
  }

  findByCompetition = async (competitionId: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM matches WHERE "competitionId" = $1 AND "userId" = $2',
      [competitionId, userId]
    )
    return result.rows
  }

  findByUser = async (userId: number) => {
    const result = await con.query(
      'SELECT * FROM matches WHERE "userId" = $1',
      [userId]
    )
    return result.rows
  }

  findByRound = async (ids: number[], userId: number) => {
    const result = await con.query(
      'SELECT * FROM matches WHERE "roundId" = $1 AND "userId" = $2',
      [ids, userId]
    )
    return result.rows
  }

  saveMatch = async (match: Match) => {
    const result = await con.query(
      'INSERT INTO matches("localTeamId", "awayTeamId", "matchDay", "roundId", "competitionId",' +
      '"localTeamGoals", "awayTeamGoals", "userId") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        match.localTeamId,
        match.awayTeamId,
        match.matchDay,
        match.roundId,
        match.competitionId,
        match.localTeamGoals,
        match.awayTeamGoals,
        match.userId
      ]
    )
    return result.rows[0]
  }

  updateMatch = async (match: Match, id: number, userId: number) => {
    const result = await con.query(
      'UPDATE matches SET "localTeamId"=$1, "awayTeamId"=$2, "matchDay"=$3,' +
      '"localTeamGoals"=$4, "awayTeamGoals"=$5 WHERE id = $6 AND "userId" = $7 RETURNING *',
      [
        match.localTeamId,
        match.awayTeamId,
        match.matchDay,
        match.localTeamGoals,
        match.awayTeamGoals,
        id,
        userId
      ]
    )
    return result.rows[0]
  }

  deleteMatch = async (id: number, userId: number) => {
    const result = await con.query(
      'DELETE FROM matches WHERE id = $1 AND "userId" = $2 RETURNING *',
      [id, userId]
    )
    return result.rows[0].id
  }
}
