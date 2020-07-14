import con from '../config/postgres.js'

const findById = async(id, userId) => {
  const result = await con.query("SELECT * FROM teams WHERE id = $1 AND userid = $2", [id, userId])
  return result.rows[0]
}

const findByManager = async(manager, userId) => {
  const result = await con.query("SELECT * FROM teams WHERE manager = $1 AND userid = $2", [manager, userId])
  return result.rows[0]
}

const findByCompetition = async(id, userId) => {
  const result = await con.query("SELECT * FROM teams WHERE competition = $1 AND userid = $2", [id, userId])
  return result.rows[0]
}

const saveTeam = async(teamToSave) => {
  const result = await con.query("INSERT INTO teams SET ?", [teamToSave])
}

const updateTeam = async(id, team, userId) => {
  const result = await con.query("UPDATE teams SET ? WHERE id = ? AND userid = ?", [team, id, userId])
}

const deleteTeam = async(id, userId) => {
  const result = await con.query("DELETE FROM teams WHERE id = $1 AND userid = $2 RETURNING *", [id, userId])
}

export default {
  findById,
  findByManager,
  findByCompetition,
  saveTeam,
  updateTeam,
  deleteTeam
};