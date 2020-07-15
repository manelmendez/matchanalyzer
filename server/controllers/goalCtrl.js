import goalService from '../dao-postgres/goal-service.js'

const addGoal = async(req, res) => {
  let userId = req.user.id;
  let goalToSave = {
    minute: req.body.minute,
    type: req.body.type,
    player: req.body.playerId,
    matchId: req.body.matchId,
    matchpart: req.body.matchpartId,
    userId: userId
  };
  try {
    const goalSaved = await goalService.saveGoal(goalToSave);
    return res.status(200).send({
      goalSaved: goalSaved
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Error al añadir gol: ${error}`
    });
  }
}

const getGoalsByMatchId = async(req, res) => {
  let userId = req.user.id;
  let matchId = req.params.matchId;
  try {
    const goals = await goalService.findByMatch(matchId, userId);
    return res.status(200).send({
      goals: goals
    });
  } catch (error) {
    return res.status(500).send({
      message: `Error al obtener gol: ${error}`
    });
  }  
}

const deleteGoal = async(req, res) => {
  let userId = req.user.id;
  let goalId = req.params.goalId;
  try {
    const goalDeleted = await goalService.deleteGoal(goalId, userId);
    return res.status(200).send({
      goalDeleted: goalDeleted
    }); 
  }
  catch (error) {
    return res.status(500).send({
      message: `Error al borrar gol: ${error}`
    });
  }
}

export default {
  addGoal,
  getGoalsByMatchId,
  deleteGoal
}
