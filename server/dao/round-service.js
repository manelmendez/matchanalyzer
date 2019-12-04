const con = require('../config/mysql')

function findById(id) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM rounds WHERE id = ?", id ,function(err, round) {
      if (err) reject(err)
      else resolve(round)
    })
  })
}

function findByCompetition(id) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM rounds WHERE competition = ?", id ,function(err, rounds) {
      if (err) reject(err)
      else resolve(rounds)
    })
  })
}

function saveRound(round) {
  return new Promise ((resolve, reject) =>{
    con.query("INSERT INTO rounds SET ?", round, function(err,result,fields) {
      if (err) reject(err)
      else {
        round.id = result.insertId
        resolve(round)
      }
    })
  })
}
function deleteRound(id) {
  return new Promise ((resolve, reject) =>{
    con.query("DELETE FROM rounds WHERE id = ?", id, function(err, result) {
      if (err) reject(err)
      else resolve(id)
    })
  })
}

module.exports = {
  findById,
  findByCompetition,
  saveRound,
  deleteRound
}