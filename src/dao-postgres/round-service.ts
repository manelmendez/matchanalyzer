import con from '../adapters/postgres.js'
import { Round } from '../models/round.js'

export class RoundService {
  findById = async (id: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM rounds WHERE id = $1 AND "userId" = $2',
      [id, userId]
    )
    return result.rows[0]
  }

  findByCompetition = async (competitionId: number, userId: number) => {    
    const result = await con.query(
      'SELECT * FROM rounds WHERE "competitionId" = $1 AND "userId" = $2',
      [competitionId, userId]
    )
    return result.rows
  }

  findByUser = async (userId: number) => {    
    const result = await con.query(
      'SELECT * FROM rounds WHERE "userId" = $1',
      [userId]
    )
    return result.rows
  }

  saveRound = async (round: Round) => {
    const result = await con.query(
      'INSERT INTO rounds(name, date, "competitionId", "userId")' +
      'VALUES($1, $2, $3, $4) RETURNING *',
      [round.name, round.date, round.competitionId, round.userId]
    )
    return result.rows[0]
  }

  deleteRound = async (id: number, userId: number) => {
    const result = await con.query(
      'DELETE FROM rounds WHERE id = $1 AND "userId" = $2 RETURNING *',
      [id, userId]
    )
    return result.rows[0].id
  }
}
