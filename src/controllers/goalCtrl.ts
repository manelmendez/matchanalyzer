import { NextFunction, Request, Response } from 'express'
import { GoalService } from '../dao-postgres/goal-service'
import { PlayerService } from '../dao-postgres/player-service'
import { Goal } from "../models/goal"
import { Player } from '../models/player'
import errorHelper, { CustomError } from '../utils/errorHelper.js'

export class GoalController {
  private goalService: GoalService
  private playerService: PlayerService

  constructor(goalService: GoalService, playerService: PlayerService) {
    this.goalService = goalService
    this.playerService = playerService
  }

  addGoal = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
        res.status(200).send({
          goalSaved
        })
      } catch (error) {
        if (error as CustomError) {
          next(error)
        }
        errorHelper.internalServerError('Error al añadir gol')
      }
    }
    catch (error) {
      next(error)
    }
  }

  getGoalsByMatchId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return errorHelper.unauthorizedError('No userId provided in Auth')
      }
      const userId: number = req.user.id
      const matchId: number = Number(req.params.matchId)
      try {
        const goals = await this.goalService.findByMatch(matchId, userId)
        res.status(200).send({
          goals
        })
      } catch (error) {
        if (error as CustomError) {
          next(error)
        }
        errorHelper.internalServerError('Error al obtener goles')
      }
    }
    catch (error) {
      next(error)
    }
  }

  deleteGoal = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return errorHelper.unauthorizedError('No userId provided in Auth')
      }
      const userId: number = req.user.id
      const goalId: number = Number(req.params.goalId)
      try {
        const goalDeleted = await this.goalService.deleteGoal(goalId, userId)
        res.status(200).send({
          goalDeleted
        })
      } catch (error) {
        console.log(error)
        next(errorHelper.internalServerError('Error al borrar el gol'))
      }
    }
    catch (error) {
      next(error)
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
