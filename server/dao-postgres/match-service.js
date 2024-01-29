import con from '../config/postgres.js'

export class MatchModel {
  static findById = async ({ id, userId }) => {
    const result = await con.query(
      'SELECT * FROM matches WHERE id = $1 AND "userId" = $2',
      [id, userId]
    )
    return result.rows[0]
  }

  static findByCompetition = async ({ competitionId, userId }) => {
    const result = await con.query(
      'SELECT * FROM matches WHERE competition = $1 AND "userId" = $2',
      [competitionId, userId]
    )
    return result.rows
  }

  static findByRound = async ({ ids, userId }) => {
    const result = await con.query(
      'SELECT * FROM matches WHERE round = $1 AND "userId" = $2',
      [ids, userId]
    )
    return result.rows
  }

  static saveMatch = async ({ match }) => {
    const result = await con.query(
      'INSERT INTO matches("localTeam", "awayTeam", "matchDay", round, competition,' +
      '"localTeamGoals", "awayTeamGoals", "userId") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        match.localTeam,
        match.awayTeam,
        match.matchDay,
        match.round,
        match.competition,
        match.localTeamGoals,
        match.awayTeamGoals,
        match.userId
      ]
    )
    return result.rows[0]
  }

  static updateMatch = async ({ match, id, userId }) => {
    const result = await con.query(
      'UPDATE matches SET "localTeam"=$1, "awayTeam"=$2, "matchDay"=$3,' +
      '"localTeamGoals"=$4, "awayTeamGoals"=$5 WHERE id = $6 AND "userId" = $7 RETURNING *',
      [
        match.localTeam,
        match.awayTeam,
        match.matchDay,
        match.localTeamGoals,
        match.awayTeamGoals,
        id,
        userId
      ]
    )
    return result.rows[0]
  }

  static deleteMatch = async ({ id, userId }) => {
    const result = await con.query(
      'DELETE FROM matches WHERE id = $1 AND "userId" = $2 RETURNING *',
      [id, userId]
    )
    return result.rows[0].id
  }
}
