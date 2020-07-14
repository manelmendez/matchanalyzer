import con from '../config/postgres.js'

const findById = async(id, userId) => {
  const result = await con.query("SELECT * FROM minutes WHERE id = $1 AND userid = $2", [id, userId])
  return result.rows[0]
}

const findByMatch = async(id, userId) => {
  const result = await con.query("SELECT * FROM minutes WHERE matchid = $1 AND userid = $2", [id, userId])
  return result.rows
}

const saveMinute = async(minute) => {
  const result = await con.query("INSERT INTO minutes SET ?", minute)
}
const deleteMinute = async(id) => {
  const result = await con.query("DELETE FROM minutes WHERE id = $1 RETURNING *", [id])
  return result.rows[0].id
}

export default {
  findById,
  findByMatch,
  saveMinute,
  deleteMinute
};