const con = require('../config/mysql')

function findById(id, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM teams WHERE id = ? AND userId = ?; SELECT * FROM players WHERE team = ? AND userId = ?", [id, userId ,id, userId],function(err, result) {
      if (err) reject(err)
      else resolve(result)
    })
  }) 
}

function findByManager(manager, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM teams WHERE manager = ? AND userId = ?", [manager, userId],function(err, teams) {
      if (err) reject(err)
      else {
        resolve(teams)
      }
    })
  })
}

function findByCompetition(id, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM teams WHERE competition = ? AND userId = ?", [id, userId],function(err, teams) {
      if (err) reject(err)
      else {
        resolve(teams)
      }
    })
  })
}

function saveTeam(teamToSave) {
  return new Promise ((resolve, reject) =>{ 
    con.query("INSERT INTO teams SET ?", teamToSave, function(err,result,fields) {
      if (err) reject(err)
      else {
        teamToSave.id = result.insertId
        resolve(teamToSave)
      }
    })
  })
}

function updateTeam(id, team, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("UPDATE teams SET ? WHERE id = ? AND userId = ?", [team, id, userId], function(err,team) {
      if (err) reject(err)
      else resolve(team)
    })
  })
}

function deleteTeam(id, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("DELETE FROM teams WHERE id = ? AND userId = ?", [id, userId], function(err, team) {
      if (err) reject(err)
      else resolve(team)
    })
  })
}

module.exports = {
  findById,
  findByManager,
  findByCompetition,
  saveTeam,
  updateTeam,
  deleteTeam
}