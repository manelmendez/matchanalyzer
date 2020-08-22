import cardService from '../dao-postgres/card-service.js'
import playerService from '../dao-postgres/player-service.js'

const addCard = async (req, res) => {
  let userId = req.user.id
  let cardToSave = {
    minute: req.body.minute,
    type: req.body.type,
    player: req.body.playerId,
    matchId: req.body.matchId,
    matchpart: req.body.matchpartId,
    roundId: req.body.roundId,
    userId: userId
  }
  try {
    const cardSaved = await cardService.saveCard(cardToSave)
    return res.status(200).send({
      cardSaved: cardSaved
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: `Error al añadir tarjeta: ${error}`
    })
  }
}

const getCardsByMatchId = async (req, res) => {
  let userId = req.user.id
  let matchId = req.params.matchId
  try {
    const cards = await cardService.findByMatch(matchId, userId)
    return res.status(200).send({
      cards: cards
    })
  } catch (error) {
    return res.status(500).send({
      message: `Error al obtener tarjeta: ${error}`
    })
  }
}

const deleteCard = async (req, res) => {
  let userId = req.user.id
  let cardId = req.params.cardId
  try {
    const cardDeleted = await cardService.deleteCard(cardId, userId)
    return res.status(200).send({
      cardDeleted: cardDeleted
    })
  } catch (error) {
    return res.status(500).send({
      message: `Error al borrar tarjeta: ${error}`
    })
  }
}

const getPlayerTeamCards = async (teamId, userId) => {
  try {
    const players = await playerService.findByTeam(teamId, userId)
    for (const player of players) {
      const playerCards = await cardService.findByPlayer(player.id, userId)
      player.cards = playerCards
    }
    return players
  } catch (error) {
    console.log(error)
    return []
  }
}

export default {
  addCard,
  getCardsByMatchId,
  deleteCard,
  getPlayerTeamCards
}
