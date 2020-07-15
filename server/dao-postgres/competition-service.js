import con from '../config/postgres.js'

const findById = async(id, managerId, userId) => {
  const result = await con.query('SELECT * FROM competitions WHERE id = $1 AND manager = $2 AND "userId" = $3', [id, managerId, userId])
  return result.rows[0]
}
const findByName = async(name, userId) => {
  const result = await con.query('SELECT * FROM competitions WHERE name = $1 AND "userId" = $2', [name, userId])
  return result.rows[0]
}
const findByManager = async(id, userId) => {
  const result = await con.query('SELECT * FROM competitions WHERE manager = $1 AND "userId" = $2', [id, userId])
  return result.rows
}
const findAll = async() => {
  const result = await con.query('SELECT * FROM competitions')
  return result.rows
}
const saveCompetition = async(competition) => {
  const result = await con.query('INSERT INTO competitions(name, season, discipline, category, manager, "signupDate", "userId")'+
  'VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *', 
  [competition.name, competition.season, competition.discipline, competition.category, competition.manager, 
    competition.signupDate, competition.userId])
  return result.rows[0]
}
const updateCompetition = async(competition, id, userId) => {
  const result = await con.query('UPDATE competitions SET name=$1, season=$2, discipline=$3, category=$4 '+
  'WHERE id = $5 AND "userId" = $6 RETURNING *', 
  [competition.name, competition.season, competition.discipline, competition.category, id, userId])
  return result.rows[0]
}
const deleteCompetition = async(id, userId) => {
  const result = await con.query('DELETE FROM competitions WHERE id = $1 AND "userId" = $2 RETURNING *', [id, userId])
  return result.rows[0].id
}
export default {
  findById,
  findByName,
  findByManager,
  findAll,
  saveCompetition,
  updateCompetition,
  deleteCompetition
};