// import tokenServices from '../services/token-services'
import bcrypt from 'bcrypt-nodejs'
import { Request, Response, NextFunction } from 'express'
import { UserService } from '../dao-postgres/user-service'
import * as tokenServices from '../services/token-services.js'
import { User } from '../models/user'
import { UserDataToken } from '../models/types'

export class UserController {
  private userService: UserService
  constructor (userService: UserService) {
    this.userService = userService
  }

  signUp = async (req: Request, res: Response) => {
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
    const user: User = {
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
      if (user.password) {
        bcrypt.hash(user.password, salt, null, async (err, hash) => {
          if (err) return err
          user.password = hash
          // saving user in DB
          try {
            const userSaved = await this.userService.saveUser(user)
            delete user.password
            return res.status(200).send({
              message: 'Te has registrado correctamente',
              token: tokenServices.createToken(userSaved),
              user: userSaved
            })
          } catch (err: any) {
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
      }
    })
  }

  /**
   * Function to sign in the web
   *
   */
  signIn = async (req: Request, res: Response) => {
    console.log(req.headers)
    // check for basic auth header
    if (
      !req.headers.authorization ||
      req.headers.authorization.indexOf('Basic ') === -1
    ) {
      return res.status(401).json({ message: 'Missing Authorization Header' })
    }
    // search for user in DB
    const base64Credentials: string = req.headers.authorization.split(' ')[1]
    const credentials: string = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [email, password]: string[] = credentials.split(':')
    try {
      const userFound: User = await this.userService.findByEmail(email)
      if (userFound && userFound.password) {
        // check if password is OK
        if (bcrypt.compareSync(password, userFound.password)) {
          // setting loginDate on DB
          userFound.lastLogin = new Date()
          const userUpdated: UserDataToken = await this.userService.updateUser(userFound)
          // delete userUpdated.password
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

  getUser = async (req: Request, res: Response) => {
    const userId: number = Number(req.params.id)
    console.log('Buscando usuario con ID: ' + userId + '...')
    // search user on DB
    try {
      const user = await this.userService.findById(userId)
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

  getAllUsers = async (req: Request, res: Response) => {
    console.log('Buscando todos los usuarios...')
    try {
      const users = await this.userService.findAll()
      res.status(200).send({
        users
      })
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }

  updateUser = async (req: Request, res: Response) => {
    console.log('Buscando todos los usuarios...')
    const user: User = req.body.user
    try {
      const userUpdated = await this.userService.updateUser(user)
      console.log('Usuarios encontrados.')
      res.status(200).send({
        user: userUpdated
      })
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }

  deleteUser = async (req: Request, res: Response) => {
    console.log('Buscando todos los usuarios...')
    const userId: number = Number(req.params.id)
    try {
      await this.userService.deleteUser(userId)
      console.log('Usuario eliminado.')
      res.status(200).send({
        message: 'Usuario eliminado'
      })
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }
}
