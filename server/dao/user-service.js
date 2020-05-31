const con = require('../config/mysql')

function findById(id) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM users WHERE id = ?", id ,function(err, user) {
      if (err) reject(err)
      else {        
        console.log(user);
        resolve(user[0])
      }
    })
  })
}
function findByEmail(email) {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM users WHERE email = ?", email ,function(err, user) {
      if (err) reject(err)
      else {        
        console.log(user);
        resolve(user[0])
      }
    })
  })
}
function findAll() {
  return new Promise ((resolve, reject) =>{
    con.query("SELECT * FROM users", function(err, users) {
      if (err) reject(err)
      else resolve(users)
    })
  })
}
function saveUser(user) {
  return new Promise ((resolve, reject) =>{
    con.query("INSERT INTO users SET ?", user, function(err) {
      if (err) reject(err)
      else resolve(user)
    })
  })
}
function updateUser(conditions, id) {
  return new Promise ((resolve, reject) =>{
    console.log(conditions);
    con.query("UPDATE users SET ? WHERE id = ?", [conditions, id], function(err,user) {
      if (err) reject(err)
      else resolve(user)
    })
  })
}
function deleteUser (userId) {
  return new Promise ((resolve, reject) =>{ 
    con.query("DELETE FROM users WHERE id = ?", [userId], function(err) {
      if (err) reject(err)
      else resolve()
    })
  })
}
module.exports = {
  findById,
  findByEmail,
  findAll,
  saveUser,
  updateUser,
  deleteUser
}