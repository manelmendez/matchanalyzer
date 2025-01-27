import { Router } from 'express'
import { PlayerController } from '../controllers/playerCtrl.js'
import { PlayerService } from '../dao-postgres/player-service.js'
import auth from '../middlewares/auth.js'

export const playerRouter = (playerService: PlayerService) => {
  const playerRouter = Router()

  const playerCtrl = new PlayerController(playerService)

  playerRouter.post('/players', auth.checkAuth, playerCtrl.addPlayer)
  playerRouter.get('/players/team/:teamId', auth.checkAuth, playerCtrl.getPlayersByTeamId)
  playerRouter.put('/players/:id', auth.checkAuth, playerCtrl.updatePlayer)
  playerRouter.delete('/players/:id', auth.checkAuth, playerCtrl.deletePlayer)

  return playerRouter
}
