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
  const result = await con.query('INSERT INTO goals(minute, type, player, "matchId", "userId", matchpart) '+
  'VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
  goal.minute, goal.type, goal.player, goal.matchId, goal.userId, goal.matchpart)
  return result.rows[0]
}
const deleteGoal = async(id, userId) => {
  const result = await con.query('DELETE FROM goals WHERE id = $1 AND "userId"=$2 RETURNING *', [id, userId])
  return result.rows[0].id
}

export default {
  findById,
  findByMatch,
  saveGoal,
  deleteGoal
};