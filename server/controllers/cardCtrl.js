export class CardController {
  constructor ({ CardModel, PlayerModel }) {
    this.cardModel = CardModel
    this.playerModel = PlayerModel
  }

  addCard = async (req, res) => {
    const userId = req.user.id
    const cardToSave = {
      minute: req.body.minute,
      type: req.body.type,
      player: req.body.playerId,
      matchId: req.body.matchId,
      matchpart: req.body.matchpartId,
      roundId: req.body.roundId,
      userId
    }
    try {
      const cardSaved = await this.cardModel.saveCard(cardToSave)
      return res.status(200).send({
        cardSaved
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        message: `Error al añadir tarjeta: ${error}`
      })
    }
  }

  getCardsByMatchId = async (req, res) => {
    const userId = req.user.id
    const matchId = req.params.matchId
    try {
      const cards = await this.cardModel.findByMatch(matchId, userId)
      return res.status(200).send({
        cards
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al obtener tarjeta: ${error}`
      })
    }
  }

  deleteCard = async (req, res) => {
    const userId = req.user.id
    const cardId = req.params.cardId
    try {
      const cardDeleted = await this.cardModel.deleteCard(cardId, userId)
      return res.status(200).send({
        cardDeleted
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al borrar tarjeta: ${error}`
      })
    }
  }

  getPlayerTeamCards = async ({ teamId, userId }) => {
    try {
      const players = await this.playerModel.findByTeam({ teamId, userId })
      for (const player of players) {
        const playerCards = await this.cardModel.findByPlayer({ playerId: player.id, userId })
        player.cards = playerCards
      }
      return players
    } catch (error) {
      console.log(error)
      return []
    }
  }
}
