const con = require('../config/mysql')

function findByMatch(id, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM matchparts WHERE matchId = ? AND userId = ?", [id, userId] ,function(err, matchparts) {
      if (err) reject(err)
      else resolve(matchparts)
    })
  })
}

function findByRound(ids, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM matchparts WHERE round = ? AND userId = ?", [ids, userId] ,function(err, matchpart) {
      if (err) reject(err)
      else resolve(matchpart)
    })
  })
}

function saveMatchpart(matchpart) {
  return new Promise ((resolve, reject) =>{
    con.query("INSERT INTO matchparts SET ?", matchpart, function(err,result) {
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
    con.query("UPDATE matchparts SET ? WHERE id = ? AND userId = ?", [match, id, userId], function(err) {
      if (err) reject(err)
      else resolve(match)
    })
  })
}
function deleteMatchpart (id, userId) {
  return new Promise ((resolve, reject) =>{ 
    con.query("DELETE FROM matchparts WHERE id = ? AND userId = ?", [id, userId], function(err) {
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