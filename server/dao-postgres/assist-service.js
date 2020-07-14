import con from '../config/postgres.js'

const findById = async(id, userId) => {
  const result = await con.query("SELECT * FROM assists WHERE id = $1 AND userid = $2", [id, userId])
  return result.rows[0]
}

const findByMatch = async(id, userId) => {
  const result = await con.query("SELECT * FROM assists WHERE matchid = $1 AND userid = $2", [id, userId])
  return result.rows
}

const saveAssist = async(assist) => {
  const result = await con.query("INSERT INTO assists SET ?", assist)
}
const deleteAssist = async(id) => {
  const result = await con.query("DELETE FROM assists WHERE id = $1", [id])
  return result.rows[0].id
}

export default {
  findById,
  findByMatch,
  saveAssist,
  deleteAssist
};