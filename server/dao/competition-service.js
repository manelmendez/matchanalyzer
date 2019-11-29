const con = require('../config/mysql')

function findById(id) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM competitions WHERE id = ?", id ,function(err, result) {
      if (err) reject(err)
      else {        
        resolve(result)
      }
    })
  })
}
function findByName(name) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM competitions WHERE name = ?", name ,function(err, competition) {
      if (err) reject(err)
      else resolve(competition)
    })
  })
}
function findByManager(id) {
  return new Promise ((resolve, reject) => {
    con.query("SELECT * FROM competitions WHERE manager = ?;", id ,function(err, competition) {
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
function updateCompetition(competition, id) {
  return new Promise ((resolve, reject) =>{
    con.query("UPDATE competitions SET ? WHERE id = ?", [competition, id], function(err,result) {
      if (err) reject(err)
      else resolve(competition)
    })
  })
}
function deleteCompetition(id) {
  return new Promise ((resolve, reject) =>{ 
    con.query("DELETE FROM competitions WHERE id = ?", id, function(err, result) {
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