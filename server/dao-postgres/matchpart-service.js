import con from '../config/postgres.js'

const findByMatch = async(id, userId) => {
  const result = await con.query("SELECT * FROM matchparts WHERE matchid = $1 AND userid = $2", [id, userId])
  return result.rows
}

const findByRound = async(ids, userId) => {
  const result = await con.query("SELECT * FROM matchparts WHERE round = $1 AND userid = $2", [ids, userId])
  return result.rows
}

const saveMatchpart = async(matchpart) => {
  const result = await con.query("INSERT INTO matchparts SET ?", matchpart)
}
const updateMatchpart = async(match, id, userId) => {
  const result = await con.query("UPDATE matchparts SET ? WHERE id = ? AND userid = ?", [match, id, userId])
}
const deleteMatchpart = async(id, userId) => {
  const result = await con.query("DELETE FROM matchparts WHERE id = $1 AND userid = $2 RETURNING *", [id, userId])
  return result.rows[0].id
}

export default {
  findByMatch,
  findByRound,
  saveMatchpart,
  updateMatchpart,
  deleteMatchpart
};