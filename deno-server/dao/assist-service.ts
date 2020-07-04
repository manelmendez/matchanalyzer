import con from '../config/mysql.ts';

async function findById(id: any, userId: any) {
  try {
    return await con.query("SELECT * FROM assists WHERE id = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}
async function findByMatch(id: any, userId: any) {
  try {
    return await con.query("SELECT * FROM assists WHERE matchId = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}
async function saveAssist(assist: any) {
  try {
    let result = await con.query("INSERT INTO assists SET ?", assist)
    assist.id = result.insertId
    return assist
  } catch (error) {
    throw new Error(error);
  }
}
async function deleteAssist(id: any, userId: any) {
  try {
    return await con.query("DELETE FROM assists WHERE id = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}

export {
  findById,
  findByMatch,
  saveAssist,
  deleteAssist
}