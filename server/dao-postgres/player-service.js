import con from '../config/postgres.js'

const savePlayer = async (player) => {
  const result = await con.query(
    'INSERT INTO players(firstname, lastname, avatar, year, team, position, "userId", guest)' +
      'VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [
      player.firstname,
      player.lastname,
      player.avatar,
      player.year,
      player.team,
      player.position,
      player.userId,
      player.guest
    ]
  )
  return result.rows[0]
}

const findByTeam = async (id, userId) => {
  const result = await con.query(
    'SELECT * FROM players WHERE team = $1 AND "userId" = $2',
    [id, userId]
  )
  return result.rows
}

const updatePlayer = async (id, player, userId) => {
  const result = await con.query(
    'UPDATE players SET firstname=$1, lastname=$2, avatar=$3, year=$4, team=$5, position=$6 ' +
      'WHERE id=$7 AND "userId"=$8 RETURNING *',
    [
      player.firstname,
      player.lastname,
      player.avatar,
      player.year,
      player.team,
      player.position,
      id,
      userId
    ]
  )
  return result.rows[0]
}

const deletePlayer = async (id, userId) => {
  const result = await con.query(
    'DELETE FROM players WHERE id = $1 AND "userId" = $2 RETURNING *',
    [id, userId]
  )
  return result.rows[0].id
}

export default {
  savePlayer,
  findByTeam,
  updatePlayer,
  deletePlayer
}
