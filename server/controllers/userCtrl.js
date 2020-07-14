import tokenServices from '../services/token-services.js'
import bcrypt from 'bcrypt-nodejs'
import userService from '../dao-postgres/user-service.js'
/**
 * Function to sign up a new user in the DB
 *
 */
const signUp = async(req, res) => {
  // check for basic auth header
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }
  // search for user in DB
  const base64Credentials =  req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');  
  const [email, password] = credentials.split(':');
  if (!email || !password) {
    return res.status(500).send({
      message: `Te faltan el email o contraseña por rellenar`
    });
  }
  const user = {
    email: email,
    name: req.body.name,
    password: password,
    provider: 'local',
    signupDate: new Date(),
    lastLogin: new Date()
  };
  
  console.log("Registrando usuario con nombre: " + user.name + "...");  
  console.log(req.body);
  bcrypt.genSalt(10, async(err, salt) => {
    if (err) return err;

    bcrypt.hash(user.password, salt, null, async(err, hash) => {
      if (err) return err;
      user.password = hash;
      // saving user in DB
      try {
        let userSaved = await userService.saveUser(user)
        delete user['password'];
        return res.status(200).send({
          message: 'Te has registrado correctamente',
          token: tokenServices.createToken(userSaved),
          user: userSaved
        });
      }
      catch(err) {
        console.log(err);
        if (err.code == "ER_DUP_ENTRY") {
          console.log("Este usuario ya existe");
          return res.status(403).send({
            message: `Este usuario ya existe`
          });
        }
        console.log("Error al crear usuario");
        return res.status(500).send({
          message: `Error al registrar el usuario: ${err}`
        });
      }
    });
  });
}

/**
 * Function to sign in the web
 *
 */
const signIn = async(req, res) => {
  console.log(req.headers);
  // check for basic auth header
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }
  // search for user in DB
  const base64Credentials =  req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');  
  const [email, password] = credentials.split(':');
  try {
    let userFound = await userService.findByEmail(email)
    if (userFound) {
      // check if password is OK
      if (bcrypt.compareSync(password, userFound.password)) {
        // setting loginDate on DB
        userFound.lastLogin = new Date()
        let userUpdated = await userService.updateUser(userFound ,userFound.id)
        delete userUpdated['password']
        res.status(200).send({
          message: 'Te has logueado correctamente',
          token: tokenServices.createToken(userUpdated),
          user: userUpdated
        });
      }
      //case if password is incorrect
      else {
        console.log("UNAUTHORIZED. Contraseña incorrecta.");
        return res.status(401).send({
          message: 'Algunos de los datos introducidos son incorrectos.'
        });
      }
    }
    else{
      console.log("No existe el usuario");
      return res.status(401).send({
        message: 'Algunos de los datos introducidos son incorrectos.'
      });
    }
  }
  catch(err) {
    console.log(`Error: ${err}`);
    return res.status(500).send({
      message: `Error al iniciar sessión`
    });
  };  
}

const getUser = async(req, res) => {
  let userId = req.params.id;
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
      });
    }
    else {
      console.log("No existe el usuario.");
      return res.status(401).send({
        message: 'No existe el usuario'
      });
    }
  }).catch((err) => {
    console.log(`Error: ${err}`);
    return res.status(500).send({
      message: `Error al buscar`
    });
  });
}

const getAllUsers = async(req, res) => {
  console.log("Buscando todos los usuarios...");
  try {
    let users = await userService.findAll()
    res.status(200).send({
      users: users
    })
  } catch (error) {
    console.log(`Error: ${error}`);
  };
}

const updateUser = async(req, res) => {
  console.log("Buscando todos los usuarios...");
  let userId = req.params.id;
  let data;
  userService.updateUser(userId, data).then((users) => {
    console.log("Usuarios encontrados.");
    res.status(200).send({
      users: users
    });
  }).catch((err) => {
    console.log(`Error: ${err}`);
  });
}

const deleteUser = async(req, res) => {
  console.log("Buscando todos los usuarios...");
  let userId = req.params.id;
  userService.deleteUser(userId).then(() => {
    console.log("Usuario eliminado.")
    res.status(200).send({
      message: "Usuario eliminado"
    })
  }).catch((err) => {
    console.log(`Error: ${err}`)
  })
}

export default {
  signUp,
  signIn,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
};
