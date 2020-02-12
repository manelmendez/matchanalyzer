const con = require('../config/mysql')

function findByMatch(ids, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM matchparts WHERE match = ? AND userId = ?", [ids, userId] ,function(err, match) {
      if (err) reject(err)
      else resolve(match)
    })
  })
}

function findByRound(ids, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM matchparts WHERE round = ? AND userId = ?", [ids, userId] ,function(err, match) {
      if (err) reject(err)
      else resolve(match)
    })
  })
}

function saveMatchpart(matchpart) {
  return new Promise ((resolve, reject) =>{
    con.query("INSERT INTO matchparts SET ?", matchpart, function(err,result,fields) {
      if (err) reject(err)
      else {
        matchpart.id = result.insertId
        resolve(matchpart)
      }
    })
  })
}
function updateMatchpart(match, id, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("UPDATE matchparts SET ? WHERE id = ? AND userId = ?", [match, id, userId], function(err,result) {
      if (err) reject(err)
      else resolve(match)
    })
  })
}
function deleteMatchpart (id, userId) {
  return new Promise ((resolve, reject) =>{ 
    con.query("DELETE FROM matchparts WHERE id = ? AND userId = ?", [id, userId], function(err,result) {
      if (err) reject(err)
      else resolve(id)
    })
  })
}

module.exports = {
  findByMatch,
  findByRound,
  saveMatchpart,
  updateMatchpart,
  deleteMatchpart
}