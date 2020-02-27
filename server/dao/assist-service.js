const con = require('../config/mysql')

function findById(id, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM assists WHERE id = ? AND userId = ?", [id, userId] ,function(err, assist) {
      if (err) reject(err)
      else resolve(assist)
    })
  })
}

function findByMatch(id, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM assists WHERE matchId = ? AND userId = ?", [id, userId] ,function(err, assists) {
      if (err) reject(err)
      else resolve(assists)
    })
  })
}

function saveAssist(assist) {
  return new Promise ((resolve, reject) =>{
    con.query("INSERT INTO assists SET ?", assist, function(err,result,fields) {
      if (err) reject(err)
      else {
        assist.id = result.insertId
        resolve(assist)
      }
    })
  })
}
function deleteAssist(id) {
  return new Promise ((resolve, reject) =>{
    con.query("DELETE FROM assists WHERE id = ?", id, function(err, result) {
      if (err) reject(err)
      else resolve(assist)
    })
  })
}

module.exports = {
  findById,
  findByMatch,
  saveAssist,
  deleteAssist
}