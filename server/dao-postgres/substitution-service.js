import con from '../config/postgres.js'

const findById = async(id, userId) => {
  const result = await con.query('SELECT * FROM substitutions WHERE id = $1 AND "userId" = $2', [id, userId])
  return result.rows[0]
}

const findByMatch = async(id, userId) => {
  const result = await con.query('SELECT * FROM substitutions WHERE "matchId" = ? AND "userId" = ?', [id, userId])
  return result.rows
}

const saveSubstitution = async(substitution) => {
  const result = await con.query('INSERT INTO substitutions ("playerIn", "playerOut", minute, "matchId", "userId", matchpart) '+
  'VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
  substitution.playerIn, substitution.playerOut, substitution.minute, substitution.matchId, substitution.userId, substitution.matchpart)
  return result.rows[0]
}
const deleteSubstitution = async(id, userId) => {
  const result = await con.query('DELETE FROM substitutions WHERE id = $1 AND "userId"=$2 RETURNING *', [id, userId])
  return result.rows[0].id
}

export default {
  findById,
  findByMatch,
  saveSubstitution,
  deleteSubstitution
};