const matchpartService = require('../dao/matchpart-service')
const goalService = require('../dao/goal-service')
const assistService = require('../dao/assist-service')
const cardService = require('../dao/card-service')
const substitutionService = require('../dao/substitution-service')
const minuteService = require('../dao/minute-service')

async function addMatchparts(req, res) {
  let userId = req.user.id
  // getting data
  for (let matchpart of req.body) {
    let matchpartToSave = {
      matchId: matchpart.match,
      formation: matchpart.formation,
      time: matchpart.time,
      team: matchpart.team,
      userId: userId
    }
    console.log(matchpart);
    
    console.log("Añadiendo partes...")
    try {
      let savedPart = await matchpartService.saveMatchpart(matchpartToSave)
      console.log("Añadiendo minutos");
      for (let player of matchpart.players) {        
        let minute = {
          player: player.player.id,
          matchpart: savedPart.id,
          matchId: player.match,
          userId: userId
        }
        await minuteService.saveMinute(minute)
      }
      console.log("Añadiendo goles");
      for (let goal of matchpart.goals) {
        let goalToSave = {
          minute: goal.minute,
          type: goal.type,
          player: goal.player.id,
          matchId: goal.match,
          matchpart: savedPart.id,
          userId: userId
        }
        let savedGoal = await goalService.saveGoal(goalToSave)
        if (goal.assist) {
          console.log("Añadiendo asistencias");
          let assistToSave = {
            type: goal.assist.type,
            player: goal.assist.player.id,
            matchId: goal.assist.match,
            goal: savedGoal.id,
            matchpart: savedPart.id,
            userId: userId
          }
          await assistService.saveAssist(assistToSave)
        }
      }
      console.log("Añadiendo tarjetas");
      for (let card of matchpart.cards) {
        let cardToSave = {
          minute: card.minute,
          type: card.type,
          player: card.player.id,
          matchId: card.match,
          matchpart: savedPart.id,
          userId: userId
        }
        await cardService.saveCard(cardToSave)
      }
      console.log("Añadiendo sustituciones");
      for (let substitution of matchpart.substitutions) {
        let substitutionToSave = {
          minute: substitution.minute,
          playerIn: substitution.playerIn.id,
          playerOut: substitution.playerOut.id,
          matchId: substitution.match,
          matchpart: savedPart.id,
          userId: userId
        }
        await substitutionService.saveSubstitution(substitutionToSave)
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: `Error al añadir partes: ${err}`
      })
    }
  }
  return res.status(200).send({
    message: "OK"
  })  
}
async function getMatchpartsByMatchId(req, res) {
  let userId = req.user.id
  let matchId = req.params.matchId
  try {
    console.log("HOLA");
    
    let matchParts = await matchpartService.findByMatch(matchId, userId)
    console.log(matchParts);
    let minutes = await minuteService.findByMatch(matchId, userId)
    let goals = await goalService.findByMatch(matchId, userId)
    let assist = await assistService.findByMatch(matchId, userId)
    let card = await cardService.findByMatch(matchId, userId)
    let substitutions = await substitutionService.findByMatch(matchId, userId)
    return res.status(200).send({
      matchParts: matchParts,
      minutes: minutes,
      goals: goals,
      assist: assist,
      card: card,
      substitutions: substitutions
    })  
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Error al obtener partes: ${error}`
    })
  }
}

module.exports = {
  addMatchparts,
  getMatchpartsByMatchId
}
