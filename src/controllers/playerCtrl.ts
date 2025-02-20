import { Request, Response } from 'express'
import { PlayerService } from '../dao-postgres/player-service'
import {Player} from '../models/player.js'
import errorHelper from '../utils/errorHelper.js'

export class PlayerController {
  private playerService: PlayerService
  constructor (playerService: PlayerService) {
    this.playerService = playerService
  }

  addPlayer = async (req: Request, res: Response) => {
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = req.user.id
    const player: Player = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      position: req.body.position,
      year: req.body.year,
      teamId: req.body.team,
      avatar:
        req.body.avatar != null
          ? req.body.avatar
          : 'assets/images/person_icon.png',
      userId,
      guest: req.body.guest
    }
    try {
      const playerSaved = await this.playerService.savePlayer(player)
      return res.status(200).send({
        player: playerSaved
      })
    } catch (err) {
      console.log(err)
      errorHelper.internalServerError('Error al añadir jugador')
    }
  }

  getPlayersByTeamId = async (req: Request, res: Response) => {
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = req.user.id
    const teamId: number = Number(req.params.teamId)
    try {
      const players: Player[] = await this.playerService.findByTeam(teamId, userId)
      return res.status(200).send({
        players
      })
    } catch (error) {      
      console.log(error)
      errorHelper.internalServerError('Error al obtener jugadores')
    }
  }

  updatePlayer = async (req: Request, res: Response) => {
    const player = req.body
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = req.user.id
    const id: number = Number(req.params.id)
    try {
      const playerUpdated = await this.playerService.updatePlayer(id, player, userId)
      res.status(200).send({ player: playerUpdated })
    } catch (err) {
      console.log(err)
      errorHelper.internalServerError('Error al editar jugador')
    }
  }

  deletePlayer = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    if (!req.user) {
      return errorHelper.unauthorizedError('No userId provided in Auth')
    }
    const userId: number = req.user.id
    try {
      await this.playerService.deletePlayer(id, userId)
      res.status(200).send({ player: id })
    } catch (err) {
      console.log(err)
      errorHelper.internalServerError('Error al borrar jugador')
    }
  }
}
