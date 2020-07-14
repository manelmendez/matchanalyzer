import con from '../config/postgres.js'

const findById = async(id, userId) => {
  const result = await con.query('SELECT * FROM cards WHERE id = $1 AND "userId" = $2', [id, userId])
  return result.rows[0]
}

const findByMatch = async(id, userId) => {
  const result = await con.query('SELECT * FROM cards WHERE "matchId" = $1 AND "userId" = $2', [id, userId])
  return result.rows
}

const saveCard = async(card) => {
  const result = await con.query('INSERT INTO cards SET ?', card)
}

const deleteCard = async(id) => {
  const result = await con.query('DELETE FROM cards WHERE id = $1 RETURNING *', [id])
  return result.rows[0].id
}

export default {
  findById,
  findByMatch,
  saveCard,
  deleteCard
};