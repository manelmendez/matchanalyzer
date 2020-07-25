import con from '../config/mysql.js'

function findById(id, userId) {
  return new Promise((resolve, reject) => {
    con.query(
      'SELECT * FROM minutes WHERE id = ? AND userId = ?',
      [id, userId],
      function (err, minute) {
        if (err) reject(err)
        else resolve(minute)
      }
    )
  })
}

function findByMatch(id, userId) {
  return new Promise((resolve, reject) => {
    con.query(
      'SELECT * FROM minutes WHERE matchId = ? AND userId = ?',
      [id, userId],
      function (err, minutes) {
        if (err) reject(err)
        else resolve(minutes)
      }
    )
  })
}

function saveMinute(minute) {
  return new Promise((resolve, reject) => {
    con.query('INSERT INTO minutes SET ?', minute, function (err, result) {
      if (err) reject(err)
      else {
        minute.id = result.insertId
        resolve(minute)
      }
    })
  })
}
function deleteMinute(id) {
  return new Promise((resolve, reject) => {
    con.query('DELETE FROM minutes WHERE id = ?', id, function (err, result) {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

export default {
  findById,
  findByMatch,
  saveMinute,
  deleteMinute
}
