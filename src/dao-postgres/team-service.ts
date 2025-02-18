import con from '../adapters/postgres.js'
import { Team } from '../models/team.js'

export class TeamService {
  findById = async (id: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM teams WHERE id = $1 AND "userId" = $2',
      [id, userId]
    )
    return result.rows[0]
  }

  findByManager = async (managerId: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM teams WHERE "managerId" = $1 AND "userId" = $2',
      [managerId, userId]
    )
    return result.rows
  }

  findByCompetition = async (competitionId: number, userId: number)=> {
    const result = await con.query(
      'SELECT * FROM teams WHERE "competitionId" = $1 AND "userId" = $2',
      [competitionId, userId]
    )
    return result.rows
  }

  findByUser = async (userId: number)=> {
    const result = await con.query(
      'SELECT * FROM teams WHERE "userId" = $1',
      [userId]
    )
    return result.rows
  }

  saveTeam = async (teamToSave: Team) => {
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
  }

  updateTeam = async (id: number, team: Team, userId: number) => {
    console.log(team)
    const result = await con.query(
      'UPDATE teams SET name=$1, avatar=$2, season=$3, "competitionId"=$4 ' +
      'WHERE id=$5 AND "userId"=$6 RETURNING *',
      [team.name, team.avatar, team.season, team.competitionId, id, userId]
    )
    return result.rows[0]
  }

  deleteTeam = async (id: number, userId: number) => {
    const result = await con.query(
      'DELETE FROM teams WHERE id = $1 AND "userId" = $2 RETURNING *',
      [id, userId]
    )
    return result.rows[0].id
  }
}
