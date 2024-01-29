import con from '../config/postgres.js'

export class TeamModel {
  static findById = async ({ id, userId }) => {
    const result = await con.query(
      'SELECT * FROM teams WHERE id = $1 AND "userId" = $2',
      [id, userId]
    )
    return result.rows[0]
  }

  static findByManager = async ({ managerId, userId }) => {
    const result = await con.query(
      'SELECT * FROM teams WHERE manager = $1 AND "userId" = $2',
      [managerId, userId]
    )
    return result.rows
  }

  static findByCompetition = async ({ competitionId, userId }) => {
    const result = await con.query(
      'SELECT * FROM teams WHERE competition = $1 AND "userId" = $2',
      [competitionId, userId]
    )
    return result.rows
  }

  static saveTeam = async ({ teamToSave }) => {
    const result = await con.query(
      'INSERT INTO teams(name, avatar, "signupDate", manager, season, competition, "userId")' +
      'VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        teamToSave.name,
        teamToSave.avatar,
        teamToSave.signupDate,
        teamToSave.manager,
        teamToSave.season,
        teamToSave.competition,
        teamToSave.userId
      ]
    )
    return result.rows[0]
  }

  static updateTeam = async ({ id, team, userId }) => {
    console.log(team)
    const result = await con.query(
      'UPDATE teams SET name=$1, avatar=$2, season=$3, competition=$4 ' +
      'WHERE id=$5 AND "userId"=$6 RETURNING *',
      [team.name, team.avatar, team.season, team.competition, id, userId]
    )
    return result.rows[0]
  }

  static deleteTeam = async ({ id, userId }) => {
    const result = await con.query(
      'DELETE FROM teams WHERE id = $1 AND "userId" = $2 RETURNING *',
      [id, userId]
    )
    return result.rows[0].id
  }
}
