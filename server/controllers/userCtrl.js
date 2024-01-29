import tokenServices from '../services/token-services.js'
import bcrypt from 'bcrypt-nodejs'
export class UserController {
  constructor ({ UserModel }) {
    this.userModel = UserModel
  }

  signUp = async (req, res) => {
    // check for basic auth header
    if (
      !req.headers.authorization ||
      req.headers.authorization.indexOf('Basic ') === -1
    ) {
      return res.status(401).json({ message: 'Missing Authorization Header' })
    }
    // search for user in DB
    const base64Credentials = req.headers.authorization.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [email, password] = credentials.split(':')
    if (!email || !password) {
      return res.status(500).send({
        message: 'Te faltan el email o contraseña por rellenar'
      })
    }
    const fullname = req.body.firstname + req.body.lastname
    const user = {
      email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password,
      provider: 'local',
      signupDate: new Date(),
      lastLogin: new Date(),
      avatar: `https://gravatar.com/avatar/${fullname}?s=200&d=retro`
    }
    console.log('Registrando usuario con nombre: ' + user.firstname + '...')
    bcrypt.genSalt(10, async (err, salt) => {
      if (err) return err

      bcrypt.hash(user.password, salt, null, async (err, hash) => {
        if (err) return err
        user.password = hash
        // saving user in DB
        try {
          const userSaved = await this.userModel.saveUser({ user })
          delete user.password
          return res.status(200).send({
            message: 'Te has registrado correctamente',
            token: tokenServices.createToken(userSaved),
            user: userSaved
          })
        } catch (err) {
          console.log(err)
          if (err.code === 'ER_DUP_ENTRY') {
            console.log('Este usuario ya existe')
            return res.status(403).send({
              message: 'Este usuario ya existe'
            })
          }
          console.log('Error al crear usuario')
          return res.status(500).send({
            message: `Error al registrar el usuario: ${err}`
          })
        }
      })
    })
  }

  /**
   * Function to sign in the web
   *
   */
  signIn = async (req, res) => {
    console.log(req.headers)
    // check for basic auth header
    if (
      !req.headers.authorization ||
      req.headers.authorization.indexOf('Basic ') === -1
    ) {
      return res.status(401).json({ message: 'Missing Authorization Header' })
    }
    // search for user in DB
    const base64Credentials = req.headers.authorization.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [email, password] = credentials.split(':')
    try {
      const userFound = await this.userModel.findByEmail({ email })
      if (userFound) {
        // check if password is OK
        if (bcrypt.compareSync(password, userFound.password)) {
          // setting loginDate on DB
          userFound.lastLogin = new Date()
          const userUpdated = await this.userModel.updateUser({ user: userFound })
          delete userUpdated.password
          res.status(200).send({
            message: 'Te has logueado correctamente',
            token: tokenServices.createToken(userUpdated),
            user: userUpdated
          })
        } else { // case if password is incorrect
          console.log('UNAUTHORIZED. Contraseña incorrecta.')
          return res.status(401).send({
            message: 'Algunos de los datos introducidos son incorrectos.'
          })
        }
      } else {
        console.log('No existe el usuario')
        return res.status(401).send({
          message: 'Algunos de los datos introducidos son incorrectos.'
        })
      }
    } catch (err) {
      console.log(`Error: ${err}`)
      return res.status(500).send({
        message: 'Error al iniciar sessión'
      })
    }
  }

  getUser = async (req, res) => {
    const userId = req.params.id
    console.log('Buscando usuario con ID: ' + userId + '...')
    // search user on DB
    try {
      const user = await this.userModel.findById({ userId })
      // case if user found
      if (user) {
        console.log('Usuario encontrado.')
        // send user
        res.status(200).send({
          message: 'Datos obtenidos correctamente',
          user
        })
      } else {
        console.log('No existe el usuario.')
        return res.status(401).send({
          message: 'No existe el usuario'
        })
      }
    } catch (err) {
      console.log(`Error: ${err}`)
      return res.status(500).send({
        message: 'Error al buscar'
      })
    }
  }

  getAllUsers = async (req, res) => {
    console.log('Buscando todos los usuarios...')
    try {
      const users = await this.userModel.findAll()
      res.status(200).send({
        users
      })
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }

  updateUser = async (req, res) => {
    console.log('Buscando todos los usuarios...')
    const userId = req.params.id
    const user = req.body.user
    try {
      const userUpdated = await this.userModel.updateUser({ userId, user })
      console.log('Usuarios encontrados.')
      res.status(200).send({
        user: userUpdated
      })
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }

  deleteUser = async (req, res) => {
    console.log('Buscando todos los usuarios...')
    const userId = req.params.id
    try {
      await this.userModel.deleteUser({ userId })
      console.log('Usuario eliminado.')
      res.status(200).send({
        message: 'Usuario eliminado'
      })
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }
}
