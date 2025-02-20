import con from '../adapters/postgres.js'
import { Competition } from '../models/competition.js'
import errorHelper, { CustomError } from '../utils/errorHelper.js'

export class CompetitionService {
  findById = async (id: number, managerId: number, userId: number) => {
    try {
      const result = await con.query(
        'SELECT * FROM competitions WHERE id = $1 AND "managerId" = $2 AND "userId" = $3',
        [id, managerId, userId]
      )
      return result.rows[0]
    }
    catch (err) {
      console.log(err);
      errorHelper.internalServerError("Error al buscar en la base de datos")
    }
  }

  findByManager = async (id: number, userId: number) => {
    try {
      const result = await con.query(
        'SELECT * FROM competitions WHERE "managerId" = $1 AND "userId" = $2',
        [id, userId]
      )
      return result.rows
    }
    catch (err) {
      console.log(err);
      errorHelper.internalServerError("Error al buscar en la base de datos")
    }
  }

  saveCompetition = async (competition: Competition) => {
    try {
      const result = await con.query(
        'INSERT INTO competitions(name, season, discipline, category, "managerId", "signupDate", "userId")' +
        'VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
        [
          competition.name,
          competition.season,
          competition.discipline,
          competition.category,
          competition.managerId,
          competition.signupDate,
          competition.userId
        ]
      )
      return result.rows[0]
    }
    catch (err) {
      console.log(err);
      errorHelper.internalServerError("Error al guardar en la base de datos")
    }
  }

  updateCompetition = async (competition: Competition, id: number, userId: number) => {
    try {
      const result = await con.query(
        'UPDATE competitions SET name=$1, season=$2, discipline=$3, category=$4 ' +
        'WHERE id = $5 AND "userId" = $6 RETURNING *',
        [
          competition.name,
          competition.season,
          competition.discipline,
          competition.category,
          id,
          userId
        ]
      )
      return result.rows[0]
    }
    catch (err) {
      console.log(err);
      errorHelper.internalServerError("Error al actualizar en la base de datos")
    }
  }

  deleteCompetition = async (id: number, userId: number) => {
    try {
      const result = await con.query(
        'DELETE FROM competitions WHERE id = $1 AND "userId" = $2 RETURNING *',
        [id, userId]
      )
      if (result.rowCount === 0) {
        errorHelper.badRequestError('No hay competición con esa Id')
      }
      return result.rows[0].id
    } catch (error) {
      if ((error as CustomError).httpStatus) {
        throw error
      }
      errorHelper.internalServerError("Error al borrar competición de la base de datos")
    }
  }
}
