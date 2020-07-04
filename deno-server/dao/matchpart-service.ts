import con from '../config/mysql.ts';

async function findByMatch(id: any, userId: any) {
  try {
    return await con.query("SELECT * FROM matchparts WHERE matchId = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}
async function findByRound(ids: any, userId: any) {
  try {
    return await con.query("SELECT * FROM matchparts WHERE round = ? AND userId = ?", [ids, userId])
  } catch (error) {
    throw new Error(error);
  }
}
async function saveMatchpart(matchpart: any) {
  try {
    let result = await con.query("INSERT INTO matchparts SET ?", matchpart)
    matchpart.id = result.insertId
    return matchpart
  } catch (error) {
    throw new Error(error);
  }
}
async function updateMatchpart(match: any, id: any, userId: any) {
  try {
    return await con.query("UPDATE matchparts SET ? WHERE id = ? AND userId = ?", [match, id, userId])
  } catch (error) {
    throw new Error(error);
  }
}
async function deleteMatchpart (id: any, userId: any) {
  try {
    return await con.query("DELETE FROM matchparts WHERE id = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}

export {
  findByMatch,
  findByRound,
  saveMatchpart,
  updateMatchpart,
  deleteMatchpart
};