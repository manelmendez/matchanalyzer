const con = require('../config/mysql')

function findById(id, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM substitutions WHERE id = ? AND userId = ?", [id, userId] ,function(err, substitution) {
      if (err) reject(err)
      else resolve(substitution)
    })
  })
}

function findByMatch(id, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM substitutions WHERE matchId = ? AND userId = ?", [id, userId] ,function(err, substitutions) {
      if (err) reject(err)
      else resolve(substitutions)
    })
  })
}

function saveSubstitution(substitution) {
  return new Promise ((resolve, reject) =>{
    con.query("INSERT INTO substitutions SET ?", substitution, function(err,result) {
      if (err) reject(err)
      else {
        substitution.id = result.insertId
        resolve(substitution)
      }
    })
  })
}
function deleteSubstitution(id) {
  return new Promise ((resolve, reject) =>{
    con.query("DELETE FROM substitutions WHERE id = ?", id, function(err, result) {
      if (err) reject(err) 
      else resolve(result)
    })
  })
}

module.exports = {
  findById,
  findByMatch,
  saveSubstitution,
  deleteSubstitution
}