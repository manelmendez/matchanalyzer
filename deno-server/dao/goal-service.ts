import con from '../config/mysql.ts';

async function findById(id: any, userId: any) {
  try {
    return await con.query("SELECT * FROM goals WHERE id = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}
async function findByMatch(id: any, userId: any) {
  try {
    return await con.query("SELECT * FROM goals WHERE matchId = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}
async function saveGoal(goal: any) {
  try {
    let result = await con.query("INSERT INTO goals SET ?", goal)
    goal.id = result.insertId
    return goal
  } catch (error) {
    throw new Error(error);
  }
}
async function deleteGoal(id: any, userId: any) {
  try {
    return await con.query("DELETE FROM goals WHERE id = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}

export {
  findById,
  findByMatch,
  saveGoal,
  deleteGoal
};