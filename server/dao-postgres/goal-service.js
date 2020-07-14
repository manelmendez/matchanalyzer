import con from '../config/postgres.js'

const findById = async(id, userId) => {
  const result = await con.query('SELECT * FROM goals WHERE id = $1 AND "userId" = $2', [id, userId])
  return result.rows[0]
}

const findByMatch = async(id, userId) => {
  const result = await con.query('SELECT * FROM goals WHERE "matchId" = $1 AND "userId" = $2', [id, userId])
  return result.rows
}

const saveGoal = async(goal) => {
  const result = await con.query('INSERT INTO goals SET ?', goal)
}
const deleteGoal = async(id) => {
  const result = await con.query('DELETE FROM goals WHERE id = $1 RETURNING *', [id])
  return result.rows[0].id
}

export default {
  findById,
  findByMatch,
  saveGoal,
  deleteGoal
};