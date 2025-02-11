import { Request, Response } from 'express'
import { CardService } from '../dao-postgres/card-service'
import { PlayerService } from '../dao-postgres/player-service'
import {Card} from '../models/card'
import { Player } from '../models/player'

export class CardController {
  private cardService: CardService
  private playerService: PlayerService

  constructor (cardService: CardService, playerService:PlayerService) {
    this.cardService = cardService
    this.playerService = playerService
  }

  addCard = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    const cardToSave: Card = {
      minute: req.body.minute,
      type: req.body.type,
      playerId: req.body.playerId,
      matchId: req.body.matchId,
      matchpartId: req.body.matchpartId,
      roundId: req.body.roundId,
      goalId: req.body.goalId,
      userId
    }
    try {
      const cardSaved = await this.cardService.saveCard(cardToSave)
      return res.status(200).send({
        cardSaved
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        message: `Error al añadir tarjeta: ${error}`
      })
    }
  }

  getCardsByMatchId = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    const matchId: number = Number(req.params.matchId)
    try {
      const cards = await this.cardService.findByMatch(matchId, userId)
      return res.status(200).send({
        cards
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al obtener tarjeta: ${error}`
      })
    }
  }

  deleteCard = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    const cardId: number = Number(req.params.cardId)
    try {
      const cardDeleted = await this.cardService.deleteCard(cardId, userId)
      return res.status(200).send({
        cardDeleted
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al borrar tarjeta: ${error}`
      })
    }
  }

  getPlayerTeamCards = async (teamId: number, userId: number) => {
    try {
      const players: Player[] = await this.playerService.findByTeam(teamId, userId)
      for (const player of players) {
        if (player.id) {
          const playerCards: Card[] = await this.cardService.findByPlayer(player.id, userId)
          player.cards = playerCards
        }
      }
      return players
    } catch (error) {
      console.log(error)
      return []
    }
  }
}
