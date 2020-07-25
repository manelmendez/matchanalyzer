import con from '../config/mysql.js'

function findById(id) {
  return new Promise((resolve, reject) => {
    con.query('SELECT * FROM users WHERE id = ?', id, function (err, user) {
      if (err) reject(err)
      else {
        console.log(user)
        resolve(user[0])
      }
    })
  })
}
function findByEmail(email) {
  return new Promise((resolve, reject) => {
    con.query('SELECT * FROM users WHERE email = ?', email, function (
      err,
      user
    ) {
      if (err) reject(err)
      else {
        console.log(user)
        resolve(user[0])
      }
    })
  })
}
const findAll = async () => {
  return con.query('SELECT * FROM users')
}
function saveUser(user) {
  return new Promise((resolve, reject) => {
    con.query('INSERT INTO users SET ?', user, function (err) {
      if (err) reject(err)
      else resolve(user)
    })
  })
}
function updateUser(conditions, id) {
  return new Promise((resolve, reject) => {
    console.log(conditions)
    con.query('UPDATE users SET ? WHERE id = ?', [conditions, id], function (
      err,
      user
    ) {
      if (err) reject(err)
      else resolve(user)
    })
  })
}
function deleteUser(userId) {
  return new Promise((resolve, reject) => {
    con.query('DELETE FROM users WHERE id = ?', [userId], function (err) {
      if (err) reject(err)
      else resolve()
    })
  })
}
export default {
  findById,
  findByEmail,
  findAll,
  saveUser,
  updateUser,
  deleteUser
}