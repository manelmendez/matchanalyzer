import con from '../config/postgres.js'

const findByMatch = async (id, userId) => {
  const result = await con.query(
    'SELECT * FROM matchparts WHERE "matchId" = $1 AND "userId" = $2',
    [id, userId]
  )
  return result.rows
}

const findByRound = async (ids, userId) => {
  const result = await con.query(
    'SELECT * FROM matchparts WHERE round = $1 AND "userId" = $2',
    [ids, userId]
  )
  return result.rows
}

const saveMatchpart = async (matchpart) => {
  const result = await con.query(
    'INSERT INTO matchparts("matchId", formation, time, team, "userId" ' +
      'VALUES($1,$2,$3,$4,$5) RETURNING *',
    matchpart.matchId,
    matchpart.formation,
    matchpart.time,
    matchpart.team,
    matchpart.userId
  )
  return result.rows[0]
}
const updateMatchpart = async (matchpart, id, userId) => {
  const result = await con.query(
    'UPDATE matchparts SET formation=$1, time=$2  WHERE id=$3 AND "userId"=$4 RETURNING *',
    [matchpart.formation, matchpart.time, id, userId]
  )
  return result.rows[0]
}
const deleteMatchpart = async (id, userId) => {
  const result = await con.query(
    'DELETE FROM matchparts WHERE id = $1 AND "userId" = $2 RETURNING *',
    [id, userId]
  )
  return result.rows[0].id
}

export default {
  findByMatch,
  findByRound,
  saveMatchpart,
  updateMatchpart,
  deleteMatchpart
}
