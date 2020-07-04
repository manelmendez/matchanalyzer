import con from '../config/mysql.ts';

async function savePlayer(player: any) {
  try {
    let result = await con.query("INSERT INTO players SET ?", player)
    player.id = result.insertId;
    return player
  } catch (error) {
    throw new Error(error);
  }
}

async function findByTeam(id: any, userId: any) {
  try {
    return await con.query("SELECT * FROM players WHERE team = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}

async function updatePlayer(id: any, player: any, userId: any) { 
  try {
    await con.query("UPDATE players SET ? WHERE id = ? AND userId = ?", [player, id, userId])
    return player
  } catch (error) {
    throw new Error(error);
  }
}

async function deletePlayer (id: any, userId: any) {
  try {
    return await con.query("DELETE FROM players WHERE id = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}

export {
  savePlayer,
  findByTeam,
  updatePlayer,
  deletePlayer
};
