import { Request, Response } from 'express'
import { GoalService } from '../dao-postgres/goal-service'
import { PlayerService } from '../dao-postgres/player-service'
import { Goal } from "../models/goal"
import { Player } from '../models/player'
import errorHelper from '../utils/errorHelper.js'

export class GoalController {
  private goalService: GoalService
  private playerService: PlayerService

  constructor (goalService: GoalService, playerService: PlayerService) {
    this.goalService = goalService
    this.playerService = playerService
  }

  addGoal = async (req: Request, res: Response) => {
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = req.user.id
    const goalToSave: Goal = {
      minute: req.body.minute,
      type: req.body.type,
      playerId: req.body.playerId,
      matchId: req.body.matchId,
      matchpartId: req.body.matchpartId,
      roundId: req.body.roundId,
      userId
    }
    try {
      const goalSaved = await this.goalService.saveGoal(goalToSave)
      return res.status(200).send({
        goalSaved
      })
    } catch (error) {
      console.log(error)
      errorHelper.internalServerError('Error al añadir gol')
    }
  }

  getGoalsByMatchId = async (req: Request, res: Response) => {
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = req.user.id
    const matchId: number = Number(req.params.matchId)
    try {
      const goals = await this.goalService.findByMatch(matchId, userId)
      return res.status(200).send({
        goals
      })
    } catch (error) {
      console.log(error)
      errorHelper.internalServerError('Error al obtener goles')
    }
  }

  deleteGoal = async (req: Request, res: Response) => {
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = req.user.id
    const goalId: number = Number(req.params.goalId)
    try {
      const goalDeleted = await this.goalService.deleteGoal(goalId, userId)
      return res.status(200).send({
        goalDeleted
      })
    } catch (error) {
      console.log(error)
      errorHelper.internalServerError('Error al borrar el gol')
    }
  }

  getPlayerTeamGoals = async (teamId: number, userId: number) => {
    try {
      const players: Player[] = await this.playerService.findByTeam(teamId, userId)
      for (const player of players) {
        if (player.id !== undefined) {
          const playerGoals: Goal[] = await this.goalService.findByPlayer(player.id, userId)
          player.goals = playerGoals
        }
        
      }
      return players
    } catch (error) {
      console.log(error)
      return []
    }
  }
}
