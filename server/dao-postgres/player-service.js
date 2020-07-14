import con from '../config/postgres.js'

const savePlayer= async(player) => {
  const result = await con.query('INSERT INTO players SET ?', [player])
}

const findByTeam= async(id, userId) => {
  const result = await con.query('SELECT * FROM players WHERE team = $1 AND "userId" = $2', [id, userId])
  return result.rows
}

const updatePlayer = async(id, player, userId) => {  
  const result = await con.query('UPDATE players SET ? WHERE id = ? AND "userId" = ?', [player, id, userId])
}

const deletePlayer = async(id, userId) => {
  const result = await con.query('DELETE FROM players WHERE id = $1 AND "userId" = $2 RETURNING *', [id, userId])
  return result.rows[0].id
}

export default {
  savePlayer,
  findByTeam,
  updatePlayer,
  deletePlayer
};
