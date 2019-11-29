const con = require('../config/mysql')

function findById(id) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM teams WHERE id = ?; SELECT * FROM players WHERE team = ?", [id,id],function(err, result) {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

function findByManager(manager) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM teams WHERE manager = ?", manager,function(err, teams) {
      if (err) reject(err)
      else {
        resolve(teams)
      }
    })
  })
}

function findByCompetition(id) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM teams WHERE competition = ?", id,function(err, teams) {
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

function updateTeam(id, team) {
  return new Promise ((resolve, reject) =>{
    con.query("UPDATE teams SET ? WHERE id = ?", [team, id], function(err,team) {
      if (err) reject(err)
      else resolve(team)
    })
  })
}

function deleteTeam(id) {
  return new Promise ((resolve, reject) =>{
    con.query("DELETE FROM teams WHERE id = ?", id, function(err, team) {
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