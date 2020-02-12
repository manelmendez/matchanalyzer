const matchpartService = require('../dao/matchpart-service')
const goalService = require('../dao/goal-service')
const assistService = require('../dao/assist-service')
const cardService = require('../dao/card-service')
const substitutionService = require('../dao/substitution-service')

async function addMatchparts(req, res) {
  let userId = req.user.id
  // getting data
  for (let matchpart of req.body.matchparts) {
    let matchpartToSave = {
      match: matchpart.match,
      formation: matchpart.formation,
      time: matchpart.time,
      team: matchpart.team,
      userId: userId
    }
    console.log("Añadiendo partes...")
    try {
      let savedPart = await matchpartService.saveMatchpart(matchpartToSave)
      for (let goal of matchpart.goals) {
        let goalToSave = {
          minute: goal.minute,
          type: goal.type,
          player: goal.player,
          match: goal.match,
          matchpart: savedPart.id,
          userId: userId
        }
        let savedGoal = await goalService.saveGoal(goalToSave)
        let assistToSave = {
          type: goal.assist.type,
          player: goal.assist.player,
          match: goal.assist.match,
          goal: savedGoal.id,
          matchpart: savedPart.id,
          userId: userId
        }
        await assistService.saveAssist(assistToSave)
      }
      for (let card of matchpart.cards) {
        let cardToSave = {
          minute: card.minute,
          type: card.type,
          player: card.player,
          match: card.match,
          matchpart: savedPart.id,
          userId: userId
        }
        await cardService.saveCard(cardToSave)
      }
      for (let substitution of matchpart.substitutions) {
        let substitutionToSave = {
          minute: substitution.minute,
          playerIn: substitution.playerIn,
          playerOut: substitution.playerOut,
          match: substitution.match,
          matchpart: savedPart.id,
          userId: userId
        }
        await substitutionService.savesubstitution(substitutionToSave)
      }
    } catch (err) {
      return res.status(500).send({
        message: `Error al añadir partes: ${err}`
      })
    }
  }
  return res.status(200).send({
    match: matchSaved
  })  
}

module.exports = {
  addMatchparts
}
