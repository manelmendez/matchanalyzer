import con from '../config/postgres.js'

const findById = async(id, userId) => {
  const result = await con.query('SELECT * FROM teams WHERE id = $1 AND "userId" = $2', [id, userId])
  return result.rows[0]
}

const findByManager = async(manager, userId) => {
  const result = await con.query('SELECT * FROM teams WHERE manager = $1 AND "userId" = $2', [manager, userId])
  return result.rows
}

const findByCompetition = async(id, userId) => {
  const result = await con.query('SELECT * FROM teams WHERE competition = $1 AND "userId" = $2', [id, userId])
  return result.rows
}

const saveTeam = async(teamToSave) => {
  const result = await con.query('INSERT INTO teams(name, avatar, signupDate, manager, season, competition, "userId")'
  +'VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
  [teamToSave.name, teamToSave.avatar, teamToSave.signupDate, teamToSave.manager,
  teamToSave.season, teamToSave.competition, teamToSave.userId])
  return result.rows[0]
}

const updateTeam = async(id, team, userId) => {
  const result = await con.query('UPDATE teams SSET name=$1, avatar=$2, season=$3, competition=$4 '+
  'WHERE id=$5 AND "userId"=$6 RETURNING *',
  [team.name, team.avatar, team.season, team.competition, id, userId])
  return result.rows[0]
}

const deleteTeam = async(id, userId) => {
  const result = await con.query('DELETE FROM teams WHERE id = $1 AND "userId" = $2 RETURNING *', [id, userId])
  return result.rows[0].id
}

export default {
  findById,
  findByManager,
  findByCompetition,
  saveTeam,
  updateTeam,
  deleteTeam
};