import { Router } from 'express'
import { UserController } from '../controllers/userCtrl.js'
import { UserService } from '../dao-postgres/user-service.js'
import auth from '../middlewares/auth.js'

export const userRouter = (userService: UserService) => {
  const userRouter = Router()

  const userCtrl = new UserController(userService)

  userRouter.post('/users', userCtrl.signUp)
  userRouter.post('/users/signin', userCtrl.signIn)
  userRouter.get('/users/:id', auth.checkAuth, userCtrl.getUser)
  userRouter.get('/users', auth.checkAuth, userCtrl.getAllUsers)
  userRouter.put('/users/:id', auth.checkAdmin, userCtrl.updateUser)
  userRouter.delete('/users/:id', auth.checkAdmin, userCtrl.deleteUser)

  return userRouter
}
