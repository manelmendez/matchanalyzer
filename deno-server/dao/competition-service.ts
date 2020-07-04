import con from '../config/mysql.ts';

async function findById(id: any, managerId: any, userId: any) {
  try {
    return con.query("SELECT * FROM competitions WHERE id = ? AND manager = ? AND userId = ?", [id, managerId, userId])
  } catch (error) {
    throw new Error(error);
  }
}
async function findByName(name: any, userId: any) {
  try {
    return await con.query("SELECT * FROM competitions WHERE name = ? AND userId = ?", [name, userId])
  } catch (error) {
    throw new Error(error);
  }
}
async function findByManager(id: any, userId: any) {
  try {
    return await con.query("SELECT * FROM competitions WHERE manager = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}
async function findAll() {
  try {
    return await con.query("SELECT * FROM competitions")
  } catch (error) {
    throw new Error(error);
  }
}
async function saveCompetition(competition: any) {
  try {
    let result = await con.query("INSERT INTO competitions SET ?", competition)
    competition.id = result.insertId
    return competition
  } catch (error) {
    throw new Error(error);
  }
}
async function updateCompetition(competition: any, id: any, userId: any) {
  try {
    await con.query("UPDATE competitions SET ? WHERE id = ? AND userId = ?", [competition, id, userId])
    return competition
  } catch (error) {
    throw new Error(error);
  }
}
async function deleteCompetition(id: any, userId: any) {
  try {
    return await con.query("DELETE FROM competitions WHERE id = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}
export {
  findById,
  findByName,
  findByManager,
  findAll,
  saveCompetition,
  updateCompetition,
  deleteCompetition
};