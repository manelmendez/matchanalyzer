import con from '../config/mysql.ts';

async function findById(id: any, userId: any) {
  try {
    return await con.query("SELECT * FROM cards WHERE id = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}
async function findByMatch(id: any, userId: any) {
  try {
    return await con.query("SELECT * FROM cards WHERE matchId = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}
async function saveCard(card: any) {
  try {
    let result = await con.query("INSERT INTO cards SET ?", card)
    card.id = result.insertId
    return card
  } catch (error) {
    throw new Error(error);
  }
}
async function deleteCard(id: any, userId: any) {
  try {
    return await con.query("DELETE FROM cards WHERE id = ? AND userId = ?", [id, userId])
  } catch (error) {
    throw new Error(error);
  }
}

export {
  findById,
  findByMatch,
  saveCard,
  deleteCard
};