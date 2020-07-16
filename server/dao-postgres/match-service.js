import con from '../config/postgres.js'

const findById = async(id, userId) => {
  const result = await con.query('SELECT * FROM matches WHERE id = $1 AND "userId" = $2', [id, userId])
  return result.rows[0]
}

const findByCompetition = async(ids, userId) => {
  const result = await con.query('SELECT * FROM matches WHERE competition = $1 AND "userId" = $2', [ids, userId])
  return result.rows
}

const findByRound = async(ids, userId) => {
  const result = await con.query('SELECT * FROM matches WHERE round = $1 AND "userId" = $2', [ids, userId])
  return result.rows
}

const saveMatch = async(match) => {
  const result = await con.query('INSERT INTO matches("localTeam", "awayTeam", "matchDay", round, competition,'+
  '"localTeamGoals", "awayTeamGoals", "userId" VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
  match.localTeam, match.awayTeam, match.matchDay, match.round, match.competition,
  match.localTeamGoals, match.awayTeamGoals, match.userId)
  return result.rows[0]
}
const updateMatch = async(match, id, userId) => {
  const result = await con.query('UPDATE matches SET "localTeam"=$1, "awayTeam"=$2, "matchDay"=$3,'+
  '"localTeamGoals"=$4, "awayTeamGoals"=$5 WHERE id = $6 AND "userId" = $7 RETURNING *',
  [match.localTeam, match.awayTeam, match.matchDay, match.localTeamGoals, match.awayTeamGoals, id, userId])
  return result.rows[0]
}
const deleteMatch = async(id, userId) => {
  const result = await con.query('DELETE FROM matches WHERE id = $1 AND "userId" = $2 RETURNING *', [id, userId])
  return result.rows[0].id
}

export default {
  findById,
  findByCompetition,
  findByRound,
  saveMatch,
  updateMatch,
  deleteMatch
};