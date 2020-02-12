const con = require('../config/mysql')

function findById(id, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM goals WHERE id = ? AND userId = ?", [id, userId] ,function(err, goal) {
      if (err) reject(err)
      else resolve(goal)
    })
  })
}

function findByMatch(id, userId) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM goals WHERE match = ? AND userId = ?", [id, userId] ,function(err, goals) {
      if (err) reject(err)
      else resolve(goals)
    })
  })
}

function saveGoal(goal) {
  return new Promise ((resolve, reject) =>{
    con.query("INSERT INTO goals SET ?", goal, function(err,result,fields) {
      if (err) reject(err)
      else {
        goal.id = result.insertId
        resolve(goal)
      }
    })
  })
}
function deleteGoal(id) {
  return new Promise ((resolve, reject) =>{
    con.query("DELETE FROM goals WHERE id = ?", id, function(err, result) {
      if (err) reject(err)
      else resolve(goal)
    })
  })
}

module.exports = {
  findById,
  findByMatch,
  saveGoal,
  deleteGoal
}