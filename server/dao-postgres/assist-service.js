import con from '../config/postgres.js'

const findById = async (id, userId) => {
  const result = await con.query(
    'SELECT * FROM assists WHERE id = $1 AND "userId" = $2',
    [id, userId]
  )
  return result.rows[0]
}

const findByMatch = async (id, userId) => {
  const result = await con.query(
    'SELECT * FROM assists WHERE "matchId" = $1 AND "userId" = $2',
    [id, userId]
  )
  return result.rows
}

const saveAssist = async (assist) => {
  const result = await con.query(
    'INSERT INTO assists(type, goal, "matchId", matchpart, player, "userId") ' +
      'VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
    assist.type,
    assist.goal,
    assist.matchId,
    assist.matchpart,
    assist.player,
    assist.userId
  )
  return result.rows[0]
}
const deleteAssist = async (id, userId) => {
  const result = await con.query(
    'DELETE FROM assists WHERE id = $1 AND "userId"=$2 RETURNING *',
    [id, userId]
  )
  return result.rows[0].id
}

export default {
  findById,
  findByMatch,
  saveAssist,
  deleteAssist
}
