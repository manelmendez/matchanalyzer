import { Router } from 'express'
import { CardController } from '../controllers/cardCtrl.js'
import { CardService } from '../dao-postgres/card-service.js'
import { PlayerService } from '../dao-postgres/player-service.js'
import auth from '../middlewares/auth.js'

export const cardRouter = (cardService: CardService, playerService:PlayerService) => {
  const cardRouter = Router()

  const cardCtrl = new CardController(cardService, playerService)

  cardRouter.get('/cards/match/:matchId', auth.checkAuth, cardCtrl.getCardsByMatchId)
  cardRouter.post('/cards', auth.checkAuth, cardCtrl.addCard)
  cardRouter.delete('/cards/:cardId', auth.checkAuth, cardCtrl.deleteCard)

  return cardRouter
}
