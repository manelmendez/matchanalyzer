import con from '../config/postgres.js'

const findById = async (id, userId) => {
  const result = await con.query(
    'SELECT * FROM rounds WHERE id = $1 AND "userId" = $2',
    [id, userId]
  )
  return result.rows[0]
}

const findByCompetition = async (id, userId) => {
  const result = await con.query(
    'SELECT * FROM rounds WHERE competition = $1 AND "userId" = $2',
    [id, userId]
  )
  return result.rows
}

const saveRound = async (round) => {
  const result = await con.query(
    'INSERT INTO rounds(name, date, competition, "userId")' +
      'VALUES($1, $2, $3, $4) RETURNING *',
    [round.name, round.date, round.competition, round.userId]
  )
  return result.rows[0]
}

const deleteRound = async (id, userId) => {
  const result = await con.query(
    'DELETE FROM rounds WHERE id = $1 AND "userId" = $2 RETURNING *',
    [id, userId]
  )
  result.rows[0].id
}

export default {
  findById,
  findByCompetition,
  saveRound,
  deleteRound
}
