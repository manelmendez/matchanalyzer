import con from '../config/mysql.ts';

async function findById(id: any) {
  try {
    let users: any = await con.query("SELECT * FROM users WHERE id = ?", [id])
    return users[0]
  } catch (error) {
    throw error
  }
}
async function findByEmail(email: any) {
  console.log(email);
  try {
    return await con.query("SELECT * FROM users WHERE email = ?", [email])
  } catch (error) {
    throw error
  }
}
async function findAll() {
  try {
    let users = await con.query("SELECT * FROM users")
    return users
  } catch (error) {
    throw new Error(error);
  }
}
async function saveUser(user: any) {
  try {
    await con.execute("INSERT INTO users(email,name,password,provider,signupDate,lastLogin) VALUES ?", [Object.values(user)])
    return user
  } catch (error) {
    throw new Error(error);
  }
}
async function updateUser(conditions: any, id: any) {
  try {
    let user: any = await con.query("UPDATE users SET ? WHERE id = ?", [conditions, id])
    return user
  } catch (error) {
    throw new Error(error); 
  }
}
async function deleteUser (userId: any) {
  try {
    await con.query("DELETE FROM users WHERE id = ?", [userId])
  } catch (error) {
    throw new Error(error);
  }
}
export {
  findById,
  findByEmail,
  findAll,
  saveUser,
  updateUser,
  deleteUser
};