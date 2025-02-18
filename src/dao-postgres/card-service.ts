import con from '../adapters/postgres.js'
import {Card} from '../models/card.js'
export class CardService {
  findById = async (id: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM cards WHERE id = $1 AND "userId" = $2',
      [id, userId]
    )
    return result.rows[0]
  }

  findByMatch = async (id: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM cards WHERE "matchId" = $1 AND "userId" = $2',
      [id, userId]
    )
    return result.rows
  }

  findByPlayer = async (id: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM cards WHERE "playerId" = $1 AND "userId" = $2',
      [id, userId]
    )
    return result.rows
  }

  saveCard = async (card: Card) => {
    const result = await con.query(
      'INSERT INTO cards(minute, type, "playerId", "matchId", "roundId", "userId", "matchpartId") ' +
      'VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [
        card.minute,
        card.type,
        card.playerId,
        card.matchId,
        card.roundId,
        card.userId,
        card.matchpartId
      ]
    )
    return result.rows[0]
  }

  deleteCard = async (id: number, userId: number) => {
    const result = await con.query(
      'DELETE FROM cards WHERE id = $1 AND "userId"=$2 RETURNING *',
      [id, userId]
    )
    return result.rows[0].id
  }
}
