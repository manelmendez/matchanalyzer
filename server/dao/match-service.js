const con = require('../config/mysql')

function findByCompetition(ids) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM matches WHERE competition = ?", ids ,function(err, match) {
      if (err) reject(err)
      else resolve(match)
    })
  })
}

function findByRound(ids) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM matches WHERE round = ?", ids ,function(err, match) {
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
function updateMatch(match, id) {
  return new Promise ((resolve, reject) =>{
    con.query("UPDATE match SET ? WHERE id = ?", [match, id], function(err,result) {
      if (err) reject(err)
      else resolve(match)
    })
  })
}
function deleteMatch (id) {
  return new Promise ((resolve, reject) =>{ 
    con.query("DELETE FROM matches WHERE id = ?", id, function(err,result) {
      if (err) reject(err)
      else resolve(match)
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