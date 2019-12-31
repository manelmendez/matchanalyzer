const con = require('../config/mysql')

function findById(id, managerId, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM competitions WHERE id = ? AND manager = ? AND userId = ?", [id, managerId, userId] ,function(err, result) {
      if (err) reject(err)
      else {        
        resolve(result)
      }
    })
  })
}
function findByName(name, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM competitions WHERE name = ? AND userId = ?", [name, userId] ,function(err, competition) {
      if (err) reject(err)
      else resolve(competition)
    })
  })
}
function findByManager(id, userId) {
  return new Promise ((resolve, reject) => {
    con.query("SELECT * FROM competitions WHERE manager = ? AND userId = ?", [id, userId] ,function(err, competition) {
      if (err) reject(err)
      else resolve(competition)
    })
  })
}
function findAll() {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM competitions",function(err, competitions) {
      if (err) reject(err)
      else resolve(competitions)
    })
  })
}
function saveCompetition(competition) {
  return new Promise ((resolve, reject) =>{
    con.query("INSERT INTO competitions SET ?", competition, function(err,result,fields) {
      if (err) reject(err)
      else {
        competition.id = result.insertId
        resolve(competition)
      }
    })
  })
}
function updateCompetition(competition, id, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("UPDATE competitions SET ? WHERE id = ? AND userId = ?", [competition, id, userId], function(err,result) {
      if (err) reject(err)
      else resolve(competition)
    })
  })
}
function deleteCompetition(id, userId) {
  return new Promise ((resolve, reject) =>{ 
    con.query("DELETE FROM competitions WHERE id = ? AND userId = ?", [id, userId], function(err, result) {
      if (err) reject(err)
      else resolve(result)
    })
  })
}
module.exports = {
  findById,
  findByName,
  findByManager,
  findAll,
  saveCompetition,
  updateCompetition,
  deleteCompetition
}