import con from '../config/postgres.js'

const findById = async (id) => {
  const result = await con.query('SELECT * FROM users WHERE id = $1', [id])
  const user = result.rows[0]
  return user
}
const findByEmail = async (email) => {
  const result = await con.query('SELECT * FROM users WHERE email = $1', [
    email
  ])
  const user = result.rows[0]
  return user
}
const findAll = async () => {
  const result = await con.query('SELECT * FROM users')
  return result.rows
}
const saveUser = async (user) => {
  let result = await con.query(
    'INSERT INTO users(email, firstname, lastname, avatar, provider, provider_id, password, "signupDate", "lastLogin")' +
      'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    [
      user.email,
      user.firstname,
      user.lastname,
      user.avatar,
      user.provider,
      user.provider_id,
      user.password,
      user.signupDate,
      user.lastLogin
    ]
  )
  return result.rows[0]
}
const updateUser = async (user) => {
  let userUpdated = await con.query(
    'UPDATE users SET email=$1, firstname=$2, lastname=$3, avatar=$4, password=$5, "lastLogin"=$6 WHERE id = $7 RETURNING *',
    [
      user.email,
      user.firstname,
      user.lastname,
      user.avatar,
      user.password,
      user.lastLogin,
      user.id
    ]
  )
  return userUpdated.rows[0]
}
const deleteUser = async (userId) => {
  let result = await con.query('DELETE FROM users WHERE id = $1 RETURNING *', [
    userId
  ])
  return result.rows[0]
}
export default {
  findById,
  findByEmail,
  findAll,
  saveUser,
  updateUser,
  deleteUser
}
