const con = require('../config/mysql')

function findById(id, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM cards WHERE id = ? AND userId = ?", [id, userId] ,function(err, card) {
      if (err) reject(err)
      else resolve(card)
    })
  })
}

function findByMatch(id, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM cards WHERE matchId = ? AND userId = ?", [id, userId] ,function(err, cards) {
      if (err) reject(err)
      else resolve(cards)
    })
  })
}

function saveCard(card) {
  return new Promise ((resolve, reject) =>{
    con.query("INSERT INTO cards SET ?", card, function(err,result) {
      if (err) reject(err)
      else {
        card.id = result.insertId
        resolve(card)
      }
    })
  })
}
function deleteCard(id) {
  return new Promise ((resolve, reject) =>{
    con.query("DELETE FROM cards WHERE id = ?", id, function(err, result) {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

module.exports = {
  findById,
  findByMatch,
  saveCard,
  deleteCard
}