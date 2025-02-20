import con from '../adapters/postgres.js'
import { Substitution } from '../models/substitution.js'
import errorHelper, { CustomError } from '../utils/errorHelper.js'

export class SubstitutionService {
  findByMatch = async (matchId: number, userId: number) => {
    try {
      const result = await con.query(
        'SELECT * FROM substitutions WHERE "matchId" = $1 AND "userId" = $2',
        [matchId, userId]
      )
      return result.rows
    } catch (error) {
      console.log(error)
      errorHelper.internalServerError("Error al buscar en base de datos")
    }
  }

  saveSubstitution = async (substitution: Substitution) => {
    try {
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
    } catch (error) {
      console.log(error)
      errorHelper.internalServerError("Error al añadir en base de datos")
    }
  }

  deleteSubstitution = async (id: number, userId: number) => {
    try {
      const result = await con.query(
        'DELETE FROM substitutions WHERE id = $1 AND "userId"=$2 RETURNING *',
        [id, userId]
      )
      if (result.rowCount === 0) {
        errorHelper.badRequestError('No hay equipo con esa Id')
      }
      return result.rows[0].id
    } catch (error) {
      if ((error as CustomError).httpStatus) {
        throw error
      }
      errorHelper.internalServerError("Error al borrar equipo de la base de datos")
    }
  }
}
