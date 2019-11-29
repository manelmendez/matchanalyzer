const tokenServices = require('../services/token-services')
const bcrypt = require('bcrypt-nodejs')
const userService = require('../dao/user-service')
/**
 * Function to sign up a new user in the DB
 *
 */
function signUp(req, res) {
  const user = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    provider: 'local',
    signupDate: new Date(),
    lastLogin: new Date()
  }
  console.log("Registrando usuario con nombre: " + user.name + "...");  
  console.log(req.body)
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return err

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return err
      user.password = hash
      // saving user in DB
      userService.saveUser(user).then((userSaved) => {
        delete user['password']
        return res.status(200).send({
          message: 'Te has registrado correctamente',
          token: tokenServices.createToken(userSaved),
          user: userSaved
        })
      })
      .catch((err) => {
        if (err.code == "ER_DUP_ENTRY") {
          console.log("Este usuario ya existe");
          return res.status(403).send({
            message: `Este usuario ya existe`
          })
        }
        console.log("Error al crear usuario");
        return res.status(500).send({
          message: `Error al registrar el usuario: ${err}`
        })
      })
    })
  })
}

/**
 * Function to sign in the web
 *
 */
function signIn(req, res) {
  // search for user in DB
  userService.findByEmail(req.body.email).then((userFound) => {
    if (userFound) {
      // check if password is OK
      if (bcrypt.compareSync(req.body.password, userFound.password)) {
        // setting loginDate on DB
        // User.loginDate(userFound.id, function(err, userLoged) {
        //   if(err) return console.log(err);
        //   console.log(`${userFound.email} se ha logueado correctamente`)
        // });        
        userFound.lastLogin = new Date()
        userService.updateUser(userFound ,userFound.id)
        delete userFound['password']
        res.status(200).send({
          message: 'Te has logueado correctamente',
          token: tokenServices.createToken(userFound),
          user: userFound
        })
      }
      //case if password is incorrect
      else {
        console.log("UNAUTHORIZED. Contraseña incorrecta.")
        return res.status(401).send({
          message: 'Algunos de los datos introducidos son incorrectos.'
        })
      }
    }
    else{
      console.log("No existe el usuario")
      return res.status(401).send({
        message: 'Algunos de los datos introducidos son incorrectos.'
      })
    }
  })
  .catch((err)=>{
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al iniciar sessión`
    })
  })  
}

function getUser(req, res) {
  let userId = req.params.id
  console.log("Buscando usuario con ID: "+userId+ "...");
  //search user on DB
  // User.findOne({_id:userId}, (err, user) => {
  userService.findById(userId).then((user) => {
    // case if user found
    if (user) {
      console.log("Usuario encontrado.");
      // send user
      res.status(200).send({
        message: 'Datos obtenidos correctamente',
        user: user
      })
    }
    else {
      console.log("No existe el usuario.")
      return res.status(401).send({
        message: 'No existe el usuario'
      })
    }
  }).catch((err) => {
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al buscar`
    })
  })
}

function getAllUsers(req, res) {
  console.log("Buscando todos los usuarios...");
  userService.findAll().then((users) => {
    console.log("Usuarios encontrados.");
    res.status(200).send({
      users: users
    })
  }).catch((err) => {
    console.log(`Error: ${err}`)
  })
}

module.exports = {
  signUp,
  signIn,
  getUser,
  getAllUsers
}
