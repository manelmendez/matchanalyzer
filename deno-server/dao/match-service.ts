import con from '../config/mysql.ts';

async function findById(id: any, userId: any) {
  try {
    return await con.query("SELECT * FROM matches WHERE id = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}
async function findByCompetition(ids: any, userId: any) {
  try {
    return await con.query("SELECT * FROM matches WHERE competition = ? AND userId = ?", [ids, userId])
  } catch (error) {
    throw new Error(error);
  }
}
async function findByRound(ids: any, userId: any) {
  try {
    return await con.query("SELECT * FROM matches WHERE round = ? AND userId = ?", [ids, userId])
  } catch (error) {
    throw new Error(error);
  }
}
async function saveMatch(match: any) {
  try {
    let result = await con.query("INSERT INTO matches SET ?", match)
    match.id = result.insertId
    return match
  } catch (error) {
    throw new Error(error);
  }
}
async function updateMatch(match: any, id: any, userId: any) {
  try {
    return await con.query("UPDATE matches SET ? WHERE id = ? AND userId = ?", [match, id, userId])
  } catch (error) {
    throw new Error(error);
  }
}
async function deleteMatch (id: any, userId: any) {
  try {
    return await con.query("DELETE FROM matches WHERE id = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}

export {
  findById,
  findByCompetition,
  findByRound,
  saveMatch,
  updateMatch,
  deleteMatch
};