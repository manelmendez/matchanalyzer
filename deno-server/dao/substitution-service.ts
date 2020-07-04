import con from '../config/mysql.ts';

async function findById(id: any, userId: any) {
  try {
    return await con.query("SELECT * FROM substitutions WHERE id = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}

async function findByMatch(id: any, userId: any) {
  try {
    return await con.query("SELECT * FROM substitutions WHERE matchId = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}

async function saveSubstitution(substitution: any) {
  try {
    let result = await con.query("INSERT INTO substitutions SET ?", substitution)
    substitution.id = result.insertId;
    return substitution
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteSubstitution(id: any, userId: any) {
  try {
    return await con.query("DELETE FROM substitutions WHERE id = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}

export {
  findById,
  findByMatch,
  saveSubstitution,
  deleteSubstitution
};