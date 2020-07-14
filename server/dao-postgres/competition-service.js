import con from '../config/postgres.js'

const findById = async(id, managerId, userId) => {
  const result = await con.query('SELECT * FROM competitions WHERE id = $1 AND manager = $2 AND "userId" = $3', [id, managerId, userId])
  return result.rows[0]
}
const findByName = async(name, userId) => {
  const result = await con.query('SELECT * FROM competitions WHERE name = $1 AND "userId" = $2', [name, userId])
  return result.rows[0]
}
const findByManager = async(id, userId) => {
  const result = await con.query('SELECT * FROM competitions WHERE manager = $1 AND "userId" = $2', [id, userId])
  return result.rows
}
const findAll = async() => {
  const result = await con.query('SELECT * FROM competitions')
  return result.rows
}
const saveCompetition = async(competition) => {
  const result = await con.query('INSERT INTO competitions SET ?', competition)
}
const updateCompetition = async(competition, id, userId) => {
  const result = await con.query('UPDATE competitions SET ? WHERE id = ? AND "userId" = ?', [competition, id, userId])
}
const deleteCompetition = async(id, userId) => {
  const result = await con.query('DELETE FROM competitions WHERE id = $1 AND "userId" = $2 RETURNING *', [id, userId])
  return result.rows[0].id
}
export default {
  findById,
  findByName,
  findByManager,
  findAll,
  saveCompetition,
  updateCompetition,
  deleteCompetition
};