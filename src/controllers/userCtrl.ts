// import tokenServices from '../services/token-services'
import { NextFunction, Request, Response } from 'express'
import { UserService } from '../dao-postgres/user-service'
import * as tokenServices from '../utils/token-services.js'
import { User } from '../models/user'
import { UserDataToken } from '../models/types'
import { PostgresError } from '../models/types';
import { hashPassword, comparePassword } from '../utils/bcrypt.js'
import errorHelper from '../utils/errorHelper.js'

export class UserController {
  private userService: UserService
  constructor(userService: UserService) {
    this.userService = userService
  }

  signUp = async (req: Request, res: Response, next: NextFunction) => {
    // check for basic auth header
    try {
      if (
        !req.headers.authorization ||
        req.headers.authorization.indexOf('Basic ') === -1
      ) {
        errorHelper.unauthorizedError('Missing Authorization Header')
      }
      // search for user in DB
      const base64Credentials: string = req.headers.authorization?.split(' ')[1] || ''
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
      const [email, password] = credentials.split(':')
      if (!email || !password) {
        errorHelper.badRequestError('Te faltan el email o contraseña por rellenar')
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
      user.password = await hashPassword(password)
      // saving user in DB
      try {
        const userSaved = await this.userService.saveUser(user)
        delete user.password
        return res.status(200).send({
          message: 'Te has registrado correctamente',
          token: tokenServices.createToken(userSaved),
          user: userSaved
        })
      } catch (err) {
        const postgresError = err as PostgresError;
        if (postgresError.code === '23505') {
          console.log('Este usuario ya existe')
          errorHelper.forbiddenError('Este usuario ya existe')
        }
      }
    } catch (err) {
      next(err)
    }
  }

  signIn = async (req: Request, res: Response, next: NextFunction) => {
    // check for basic auth header
    if (
      !req.headers.authorization ||
      req.headers.authorization.indexOf('Basic ') === -1
    ) {
      errorHelper.unauthorizedError('Missing Authorization Header')
    }
    const base64Credentials: string = req.headers.authorization?.split(' ')[1] || ''
    const credentials: string = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [email, password]: string[] = credentials.split(':')
    try {
      const userFound: User = await this.userService.findByEmail(email)
      if (userFound && userFound.password) {
        // check if password is OK
        const isMAtch = await comparePassword(userFound.password, password)
        if (isMAtch) {
          // setting loginDate on DB
          userFound.lastLogin = new Date()
          const userUpdated: UserDataToken = await this.userService.updateUser(userFound)
          // delete userUpdated.password
          return res.status(200).send({
            message: 'Te has logueado correctamente',
            token: tokenServices.createToken(userUpdated),
            user: userUpdated
          })
        } else { // case if password is incorrect
          console.log('UNAUTHORIZED. Contraseña incorrecta.')
          errorHelper.unauthorizedError('Algunos de los datos introducidos son incorrectos.')
        }
      } else {
        console.log('No existe el usuario')
        errorHelper.unauthorizedError('Algunos de los datos introducidos son incorrectos.')
      }
    } catch (err) {
      next(err)
    }
  }

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = Number(req.params.id)
    console.log('Buscando usuario con ID: ' + userId + '...')
    // search user on DB
    try {
      const user = await this.userService.findById(userId)
      // case if user found
      if (user) {
        console.log('Usuario encontrado.')
        // send user
        return res.status(200).send({
          message: 'Datos obtenidos correctamente',
          user
        })
      } else {
        console.log('No existe el usuario.')
        errorHelper.badRequestError('No existe el usuario')
      }
    } catch (err) {
      next(err)
    }
  }

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Buscando todos los usuarios...')
      try {
        const users = await this.userService.findAll()
        return res.status(200).send({
          users
        })
      } catch (error) {
        console.log(`Error: ${error}`)
        errorHelper.forbiddenError('Error al obtener usuarios')
      }
    }
    catch (error) {
      next(error)
    }
  }

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Buscando todos los usuarios...')
      const user: User = req.body.user
      try {
        const userUpdated = await this.userService.updateUser(user)
        console.log('Usuarios encontrados.')
        return res.status(200).send({
          user: userUpdated
        })
      } catch (err) {
        console.log(`Error: ${err}`)
        errorHelper.forbiddenError('No se ha podido actualizar el usuario')
      }
    }
    catch (error) {
      next(error)
    }
  }

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Buscando todos los usuarios...')
      const userId: number = Number(req.params.id)
      try {
        await this.userService.deleteUser(userId)
        console.log('Usuario eliminado.')
        return res.status(200).send({
          message: 'Usuario eliminado'
        })
      } catch (err) {
        console.log(`Error: ${err}`)
        errorHelper.forbiddenError('No se ha podido eliminar el usuario')
      }
    }
    catch (error) {
      next(error)
    }
  }
}
