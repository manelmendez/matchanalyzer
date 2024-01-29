export class GoalController {
  constructor ({ GoalModel, PlayerModel }) {
    this.goalModel = GoalModel
    this.playerModel = PlayerModel
  }

  addGoal = async (req, res) => {
    const userId = req.user.id
    const goalToSave = {
      minute: req.body.minute,
      type: req.body.type,
      player: req.body.playerId,
      matchId: req.body.matchId,
      matchpart: req.body.matchpartId,
      roundId: req.body.roundId,
      userId
    }
    try {
      const goalSaved = await this.goalModel.saveGoal({ goal: goalToSave })
      return res.status(200).send({
        goalSaved
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        message: `Error al añadir gol: ${error}`
      })
    }
  }

  getGoalsByMatchId = async (req, res) => {
    const userId = req.user.id
    const matchId = req.params.matchId
    try {
      const goals = await this.goalModel.findByMatch({ matchId, userId })
      return res.status(200).send({
        goals
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al obtener gol: ${error}`
      })
    }
  }

  deleteGoal = async (req, res) => {
    const userId = req.user.id
    const goalId = req.params.goalId
    try {
      const goalDeleted = await this.goalModel.deleteGoal({ id: goalId, userId })
      return res.status(200).send({
        goalDeleted
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al borrar gol: ${error}`
      })
    }
  }

  getPlayerTeamGoals = async ({ teamId, userId }) => {
    try {
      const players = await this.playerModel.findByTeam({ teamId, userId })
      for (const player of players) {
        const playerGoals = await this.goalModel.findByPlayer({ playerId: player.id, userId })
        player.goals = playerGoals
      }
      return players
    } catch (error) {
      console.log(error)
      return []
    }
  }
}
