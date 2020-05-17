const goalService = require('../dao/goal-service')

async function addGoal(req, res) {
  let userId = req.user.id
  let goalToSave = {
    minute: req.body.minute,
    type: req.body.type,
    player: req.body.playerId,
    matchId: req.body.matchId,
    matchpart: req.body.matchpartId,
    userId: userId
  }
  try {
    let goalSaved = await goalService.saveGoal(goalToSave)
    return res.status(200).send({
      goalSaved: goalSaved
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Error al añadir gol: ${error}`
    })
  }
}

async function getGoalsByMatchId(req, res) {
  let userId = req.user.id
  let matchId = req.params.matchId
  try {
    let goals = await goalService.findByMatch(matchId, userId)
    return res.status(200).send({
      goals: goals
    })
  } catch (error) {
    return res.status(500).send({
      message: `Error al obtener gol: ${error}`
    })
  }  
}

async function deleteGoal(req, res) {
  let userId = req.user.id
  let goalId = req.params.goalId
  try {
    let goalDeleted = await goalService.deleteGoal(goalId, userId)
    return res.status(200).send({
      goalDeleted: goalDeleted
    }) 
  }
  catch (error) {
    return res.status(500).send({
      message: `Error al borrar gol: ${error}`
    })
  }
}

module.exports = {
  addGoal,
  getGoalsByMatchId,
  deleteGoal
}
