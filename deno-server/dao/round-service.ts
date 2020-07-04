import con from '../config/mysql.ts';

async function findById(id: any, userId: any) {
  try {
    let round = await con.query("SELECT * FROM rounds WHERE id = ? AND userId = ?", [id, userId])
    return round[0]
  } catch (error) {
    throw new Error(error)
  }
}

async function findByCompetition(id: any, userId: any) {
  try {
    return await con.query("SELECT * FROM rounds WHERE competition = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error)
  }
}

async function saveRound(round: any) {
  try {
    let result = await con.query("INSERT INTO rounds SET ?", round)
    round.id = result.insertId;
    return round
  } catch (error) {
    throw new Error(error)
  }
}

async function deleteRound(id: any, userId: any) {
  try {
    return await con.query("DELETE FROM rounds WHERE id = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error)
  }
}

export {
  findById,
  findByCompetition,
  saveRound,
  deleteRound
};