import { Router } from 'express'
import { PlayerController } from '../controllers/playerCtrl.js'
import auth from '../middlewares/auth.js'

export const playerRouter = ({ PlayerModel }) => {
  const playerRouter = Router()

  const playerCtrl = new PlayerController({ PlayerModel })

  playerRouter.post('/players', auth.checkAuth, playerCtrl.addPlayer)
  playerRouter.get('/players/team/:teamId', auth.checkAuth, playerCtrl.getPlayersByTeamId)
  playerRouter.put('/players/:id', auth.checkAuth, playerCtrl.updatePlayer)
  playerRouter.delete('/players/:id', auth.checkAuth, playerCtrl.deletePlayer)

  return playerRouter
}
