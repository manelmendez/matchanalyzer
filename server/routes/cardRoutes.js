import { Router } from 'express'
import { CardController } from '../controllers/cardCtrl.js'
import auth from '../middlewares/auth.js'

export const cardRouter = ({ CardModel, PlayerModel }) => {
  const cardRouter = Router()

  const cardCtrl = new CardController({ CardModel, PlayerModel })

  cardRouter.get('/cards/match/:matchId', auth.checkAuth, cardCtrl.getCardsByMatchId)
  cardRouter.post('/cards', auth.checkAuth, cardCtrl.addCard)
  cardRouter.delete('/cards/:cardId', auth.checkAuth, cardCtrl.deleteCard)

  return cardRouter
}
