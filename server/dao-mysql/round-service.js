import con from '../config/mysql.js'

function findById(id, userId) {
  return new Promise((resolve, reject) => {
    con.query(
      'SELECT * FROM rounds WHERE id = ? AND userId = ?',
      [id, userId],
      function (err, round) {
        if (err) reject(err)
        else resolve(round)
      }
    )
  })
}

function findByCompetition(id, userId) {
  return new Promise((resolve, reject) => {
    con.query(
      'SELECT * FROM rounds WHERE competition = ? AND userId = ?',
      [id, userId],
      function (err, rounds) {
        if (err) reject(err)
        else resolve(rounds)
      }
    )
  })
}

function saveRound(round) {
  return new Promise((resolve, reject) => {
    con.query('INSERT INTO rounds SET ?', round, function (err, result) {
      if (err) reject(err)
      else {
        round.id = result.insertId
        resolve(round)
      }
    })
  })
}
function deleteRound(id, userId) {
  return new Promise((resolve, reject) => {
    con.query(
      'DELETE FROM rounds WHERE id = ? AND userId = ?',
      [id, userId],
      function (err) {
        if (err) reject(err)
        else resolve(id)
      }
    )
  })
}

export default {
  findById,
  findByCompetition,
  saveRound,
  deleteRound
}
