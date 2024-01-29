import con from '../config/postgres.js'

export class CardModel {
  static findById = async ({ id, userId }) => {
    const result = await con.query(
      'SELECT * FROM cards WHERE id = $1 AND "userId" = $2',
      [id, userId]
    )
    return result.rows[0]
  }

  static findByMatch = async ({ id, userId }) => {
    const result = await con.query(
      'SELECT * FROM cards WHERE "matchId" = $1 AND "userId" = $2',
      [id, userId]
    )
    return result.rows
  }

  static findByPlayer = async ({ id, userId }) => {
    const result = await con.query(
      'SELECT * FROM cards WHERE player = $1 AND "userId" = $2',
      [id, userId]
    )
    return result.rows
  }

  static saveCard = async ({ card }) => {
    const result = await con.query(
      'INSERT INTO cards(minute, type, player, "matchId", "roundId", "userId", matchpart) ' +
      'VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [
        card.minute,
        card.type,
        card.player,
        card.matchId,
        card.roundId,
        card.userId,
        card.matchpart
      ]
    )
    return result.rows[0]
  }

  static deleteCard = async ({ id, userId }) => {
    const result = await con.query(
      'DELETE FROM cards WHERE id = $1 AND "userId"=$2 RETURNING *',
      [id, userId]
    )
    return result.rows[0].id
  }
}
