import con from '../config/mysql.ts';

async function findById(id: any, userId: any) {
  try {
    return await con.query("SELECT * FROM teams WHERE id = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}

async function findByManager(manager: any, userId: any) {
  try {
    return await con.query("SELECT * FROM teams WHERE manager = ? AND userId = ?", [manager, userId])
  } catch (error) {
    throw new Error(error);
  }
}

async function findByCompetition(id: any, userId: any) {
  try {
    return await con.query("SELECT * FROM teams WHERE competition = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}

async function saveTeam(teamToSave: any) {
  try {
    let result = await con.query("INSERT INTO teams SET ?", teamToSave)
    teamToSave.id = result.insertId;
    return teamToSave
  } catch (error) {
    throw new Error(error);
  }
}

async function updateTeam(id: any, team: any, userId: any) { 
  try {
    await con.query("UPDATE teams SET ? WHERE id = ? AND userId = ?", [team, id, userId])
    return team
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteTeam(id: any, userId: any) {
  try {
    return await con.query("DELETE FROM teams WHERE id = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}

export {
  findById,
  findByManager,
  findByCompetition,
  saveTeam,
  updateTeam,
  deleteTeam
};