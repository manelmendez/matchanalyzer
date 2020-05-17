const con = require('../config/mysql')

function savePlayer(player) {
  return new Promise ((resolve, reject) =>{ 
    con.query("INSERT INTO players SET ?", player, function(err,result) {
      if (err) reject(err)
      else {        
        player.id = result.insertId
        resolve(player)
      }
    })
  })
}

function updatePlayer(id, player, userId) {  
  return new Promise ((resolve, reject) =>{ 
    con.query("UPDATE players SET ? WHERE id = ? AND userId = ?", [player, id, userId], function(err) {      
      if (err) reject(err)
      else {
        resolve(player)
      }
    })
  })
}

function deletePlayer (id, userId) {
  return new Promise ((resolve, reject) =>{ 
    con.query("DELETE FROM players WHERE id = ?", [id, userId], function(err,result) {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

module.exports = {
  savePlayer,
  updatePlayer,
  deletePlayer
}
