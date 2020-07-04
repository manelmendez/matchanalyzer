import con from '../config/mysql.ts';

async function findById(id: any, userId: any) {
  try {
    return await con.query("SELECT * FROM minutes WHERE id = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}
async function findByMatch(id: any, userId: any) {
  try {
    return await con.query("SELECT * FROM minutes WHERE matchId = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}
async function saveMinute(minute: any) {
  try {
    let result = await con.query("INSERT INTO minutes SET ?", minute)
    minute.id = result.insertId
    return minute
  } catch (error) {
    throw new Error(error);
  }
}
async function deleteMinute(id: any, userId: any) {
  try {
    return await con.query("DELETE FROM minutes WHERE id = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}

export {
  findById,
  findByMatch,
  saveMinute,
  deleteMinute
};