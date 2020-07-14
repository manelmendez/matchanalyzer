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
  const result = await con.query('INSERT INTO matches SET ?', match)
}
const updateMatch = async(match, id, userId) => {
  const result = await con.query('UPDATE matches SET ? WHERE id = ? AND "userId" = ?', [match, id, userId])
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