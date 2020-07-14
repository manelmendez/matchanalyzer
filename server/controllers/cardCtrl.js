import cardService from '../dao-postgres/card-service.js'

const addCard = async(req, res) => {
  let userId = req.user.id;
  let cardToSave = {
    minute: req.body.minute,
    type: req.body.type,
    player: req.body.playerId,
    matchId: req.body.matchId,
    matchpart: req.body.matchpartId,
    userId: userId,
  };
  try {
    let cardSaved = await cardService.saveCard(cardToSave);
    return res.status(200).send({
      cardSaved: cardSaved
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Error al añadir tarjeta: ${error}`
    });
  }
}

const getCardsByMatchId = async(req, res) => {
  let userId = req.user.id;
  let matchId = req.params.matchId;
  try {
    let cards = await cardService.findByMatch(matchId, userId);
    return res.status(200).send({
      cards: cards
    });
  } catch (error) {
    return res.status(500).send({
      message: `Error al obtener tarjeta: ${error}`
    });
  }  
}

const deleteCard = async(req, res) => {
  let userId = req.user.id;
  let cardId = req.params.cardId;
  try {
    let cardDeleted = await cardService.deleteCard(cardId, userId);
    return res.status(200).send({
      cardDeleted: cardDeleted
    }); 
  }
  catch (error) {
    return res.status(500).send({
      message: `Error al borrar tarjeta: ${error}`
    });
  }
}

export default {
  addCard,
  getCardsByMatchId,
  deleteCard
}
