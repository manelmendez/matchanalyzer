import con from '../config/postgres.js'
import { Competition } from '../models/competition.js'

export class CompetitionService {
  findById = async (id: number, managerId: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM competitions WHERE id = $1 AND "managerId" = $2 AND "userId" = $3',
      [id, managerId, userId]
    )
    return result.rows[0]
  }

  findByName = async (name: string, userId: number) => {
    const result = await con.query(
      'SELECT * FROM competitions WHERE name = $1 AND "userId" = $2',
      [name, userId]
    )
    return result.rows[0]
  }

  findByManager = async (id: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM competitions WHERE "managerId" = $1 AND "userId" = $2',
      [id, userId]
    )
    return result.rows
  }

  findAll = async () => {
    const result = await con.query('SELECT * FROM competitions')
    return result.rows
  }

  saveCompetition = async (competition: Competition) => {
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

  updateCompetition = async (competition: Competition, id: number, userId: number) => {
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

  deleteCompetition = async (id: number, userId: number) => {
    const result = await con.query(
      'DELETE FROM competitions WHERE id = $1 AND "userId" = $2 RETURNING *',
      [id, userId]
    )
    return result.rows[0].id
  }
}
