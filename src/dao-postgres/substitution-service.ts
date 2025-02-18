import con from '../adapters/postgres.js'
import { Substitution } from '../models/substitution.js'

export class SubstitutionService {
  findById = async (id: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM substitutions WHERE id = $1 AND "userId" = $2',
      [id, userId]
    )
    return result.rows[0]
  }

  findByMatch = async (matchId: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM substitutions WHERE "matchId" = $1 AND "userId" = $2',
      [matchId, userId]
    )
    return result.rows
  }

  saveSubstitution = async (substitution: Substitution) => {
    const result = await con.query(
      'INSERT INTO substitutions ("playerIn", "playerOut", minute, "matchId", "roundId", "userId", "matchpartId") ' +
      'VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [
        substitution.playerIn,
        substitution.playerOut,
        substitution.minute,
        substitution.matchId,
        substitution.roundId,
        substitution.userId,
        substitution.matchpartId
      ]
    )
    return result.rows[0]
  }

  deleteSubstitution = async (id: number, userId: number) => {
    const result = await con.query(
      'DELETE FROM substitutions WHERE id = $1 AND "userId"=$2 RETURNING *',
      [id, userId]
    )
    return result.rows[0].id
  }
}
