const con = require('../config/mysql')

function findByCompetition(ids, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM matches WHERE competition = ? AND userId = ?", [ids, userId] ,function(err, match) {
      if (err) reject(err)
      else resolve(match)
    })
  })
}

function findByRound(ids, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM matches WHERE round = ? AND userId = ?", [ids, userId] ,function(err, match) {
      if (err) reject(err)
      else resolve(match)
    })
  })
}

function saveMatch(match) {
  return new Promise ((resolve, reject) =>{
    con.query("INSERT INTO matches SET ?", match, function(err,result,fields) {
      if (err) reject(err)
      else {
        match.id = result.insertId
        resolve(match)
      }
    })
  })
}
function updateMatch(match, id, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("UPDATE matches SET ? WHERE id = ? AND userId = ?", [match, id, userId], function(err,result) {
      if (err) reject(err)
      else resolve(match)
    })
  })
}
function deleteMatch (id, userId) {
  return new Promise ((resolve, reject) =>{ 
    con.query("DELETE FROM matches WHERE id = ? AND userId = ?", [id, userId], function(err,result) {
      if (err) reject(err)
      else resolve(id)
    })
  })
}

module.exports = {
  findByCompetition,
  findByRound,
  saveMatch,
  updateMatch,
  deleteMatch
}