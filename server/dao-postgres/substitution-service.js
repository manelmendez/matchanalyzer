import con from '../config/postgres.js'

const findById = async(id, userId) => {
  const result = await con.query("SELECT * FROM substitutions WHERE id = $1 AND userid = $2", [id, userId])
  return result.rows[0]
}

const findByMatch = async(id, userId) => {
  const result = await con.query("SELECT * FROM substitutions WHERE matchid = ? AND userid = ?", [id, userId])
  return result.rows
}

const saveSubstitution = async(substitution) => {
  const result = await con.query("INSERT INTO substitutions SET ?", [substitution])
}
const deleteSubstitution = async(id) => {
  const result = await con.query("DELETE FROM substitutions WHERE id = $1 RETURNING *", [id])
  return result.rows[0].id
}

export default {
  findById,
  findByMatch,
  saveSubstitution,
  deleteSubstitution
};