import con from '../adapters/postgres.js'
import { Team } from '../models/team.js'
import errorHelper, { CustomError } from '../utils/errorHelper.js'

export class TeamService {
  findById = async (id: number, userId: number) => {
    try {
      const result = await con.query(
        'SELECT * FROM teams WHERE id = $1 AND "userId" = $2',
        [id, userId]
      )
      return result.rows[0]
    } catch (error) {
      console.log(error)
      errorHelper.internalServerError("Error al buscar en base de datos")
    }
  }

  findByManager = async (managerId: number, userId: number) => {
    try {
      const result = await con.query(
        'SELECT * FROM teams WHERE "managerId" = $1 AND "userId" = $2',
        [managerId, userId]
      )
      return result.rows
    } catch (error) {
      console.log(error)
      errorHelper.internalServerError("Error al buscar en base de datos")
    }
  }

  findByCompetition = async (competitionId: number, userId: number) => {
    try {
      const result = await con.query(
        'SELECT * FROM teams WHERE "competitionId" = $1 AND "userId" = $2',
        [competitionId, userId]
      )
      return result.rows
    } catch (error) {
      console.log(error)
      errorHelper.internalServerError("Error al buscar en base de datos")
    }
  }

  saveTeam = async (teamToSave: Team) => {
    try {
      const result = await con.query(
        'INSERT INTO teams(name, avatar, "signupDate", "managerId", season, "competitionId", "userId")' +
        'VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [
          teamToSave.name,
          teamToSave.avatar,
          teamToSave.signupDate,
          teamToSave.managerId,
          teamToSave.season,
          teamToSave.competitionId,
          teamToSave.userId
        ]
      )
      return result.rows[0]
    } catch (error) {
      console.log(error)
      errorHelper.internalServerError("Error al guardar en base de datos")
    }
  }

  updateTeam = async (id: number, team: Team, userId: number) => {
    try {
      const result = await con.query(
        'UPDATE teams SET name=$1, avatar=$2, season=$3, "competitionId"=$4 ' +
        'WHERE id=$5 AND "userId"=$6 RETURNING *',
        [team.name, team.avatar, team.season, team.competitionId, id, userId]
      )
      return result.rows[0]
    }
    catch (err) {
      console.log(err);
      errorHelper.internalServerError("Error al actualizar en la base de datos")
    }
  }

  deleteTeam = async (id: number, userId: number) => {
    try {
      const result = await con.query(
        'DELETE FROM teams WHERE id = $1 AND "userId" = $2 RETURNING *',
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
