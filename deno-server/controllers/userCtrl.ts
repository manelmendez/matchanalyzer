import tokenServices from '../services/token-services.ts'
import {bcrypt} from '../deps.ts'
import * as userService from '../dao/user-service.ts'
import { Context } from '../deps.ts';
/**
 * Function to sign up a new user in the DB
 *
 */
async function signUp(ctx: Context) {
  // check for basic auth header
  if (!ctx.request.headers.get("authorization") || ctx.request.headers.get("authorization")?.indexOf('Basic ') === -1) {
    ctx.response.status = 401
    ctx.response.body = { message: 'Missing Authorization Header' };
  }
  const authHeader =  ctx.request.headers.get("authorization")
  if (authHeader) {
    let base64Credentials = authHeader.split(' ')[1];
    // const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const credentials = atob(base64Credentials);
    const [email, password] = credentials.split(':');
    if (!email || !password) {
      ctx.response.status= 500
      ctx.response.body = {
        message: `Te faltan el email o contraseña por rellenar`
      };
    }
    const body = await ctx.request.body({
      contentTypes: {
        text: ["application/json"],
      },
    });    
    const user = {
      email: email,
      name: body.value.name,
      password: password,
      provider: 'local',
      signupDate: new Date(),
      lastLogin: new Date()
    };
    console.log("Registrando usuario con nombre: " + user.name + "...");  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash;
    // saving user in DB
    try {
      let userSaved = await userService.saveUser(user)
      delete user['password'];
      ctx.response.status = 200
      ctx.response.body = {
        message: 'Te has registrado correctamente',
        token: tokenServices.createToken(userSaved),
        user: userSaved
      };
    } catch (err) {
      if (err.code == "ER_DUP_ENTRY") {
        console.log("Este usuario ya existe");
        ctx.response.status = 403
        ctx.response.body = { message: `Este usuario ya existe` }
      }
      console.log("Error al crear usuario");
      ctx.response.status = 500
      ctx.response.body = { message: `Error al registrar el usuario: ${err}` }
    }
  }
}

/**
 * Function to sign in the web
 *
 */
async function signIn(ctx: Context) {
  console.log(ctx.request.headers);
  // check for basic auth header
  if (!ctx.request.headers.get("authorization")) {
    ctx.response.status = 401
    ctx.response.body = { message: 'Missing Authorization Header' };
  }
  // search for user in DB
  const authHeader =  ctx.request.headers.get("authorization")
  if (authHeader) {
    let base64Credentials = authHeader.split(' ')[1];
    // const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const credentials = atob(base64Credentials);
    const [email, password] = credentials.split(':');
    let userFound = await userService.findByEmail(email)    
    if (userFound && userFound.length != 0) {
      // check if password is OK
      if (bcrypt.compare(password, userFound.password)) {
        // setting loginDate on DB
        // User.loginDate(userFound.id, function(err, userLoged) {
        //   if(err) return console.log(err);
        //   console.log(`${userFound.email} se ha logueado correctamente`)
        // });        
        userFound.lastLogin = new Date();
        let conditions = {
          lastLogin: userFound.lastLogin 
        }
        userService.updateUser(conditions ,userFound.id);
        delete userFound['password'];
        ctx.response.status = 200
        ctx.response.body = {
          message: 'Te has logueado correctamente',
          token: tokenServices.createToken(userFound),
          user: userFound
        };
      }
      //case if password is incorrect
      else {
        console.log("UNAUTHORIZED. Contraseña incorrecta.");
        ctx.response.status = 401
        ctx.response.body = {
          message: 'Algunos de los datos introducidos son incorrectos.'
        };
      }
    }
    else{
      console.log("No existe el usuario");
      ctx.response.status = 401
      ctx.response.body = {
        message: 'Algunos de los datos introducidos son incorrectos.'
      }
    }
  }
}

function getUser(req: any, res: any) {
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

function getAllUsers(req: any, res: any) {
  console.log("Buscando todos los usuarios...");
  userService.findAll().then((users) => {
    console.log("Usuarios encontrados.");
    res.status(200).send({
      users: users
    });
  }).catch((err) => {
    console.log(`Error: ${err}`);
  });
}

function updateUser(req: any, res: any) {
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

function deleteUser(req: any, res: any) {
  console.log("Buscando todos los usuarios...");
  let userId = req.params.id;
  userService.deleteUser(userId).then(() => {
    console.log("Usuario eliminado.");
    res.status(200).send({
      message: "Usuario eliminado"
    });
  }).catch((err) => {
    console.log(`Error: ${err}`);
  });
}

export default {
  signUp,
  signIn,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
};
