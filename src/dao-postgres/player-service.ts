import con from '../adapters/postgres.js'
import {Player} from '../models/player.js'

export class PlayerService {
  savePlayer = async (player: Player) => {
    const result = await con.query(
      'INSERT INTO players(firstname, lastname, avatar, year, "teamId", position, "userId", guest)' +
      'VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        player.firstname,
        player.lastname,
        player.avatar,
        player.year,
        player.teamId,
        player.position,
        player.userId,
        player.guest
      ]
    )
    return result.rows[0]
  }

  findByTeam = async (teamId: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM players WHERE "teamId" = $1 AND "userId" = $2',
      [teamId, userId]
    )
    return result.rows
  }

  updatePlayer = async (id: number, player: Player, userId: number) => {
    const result = await con.query(
      'UPDATE players SET firstname=$1, lastname=$2, avatar=$3, year=$4, "teamId"=$5, position=$6 ' +
      'WHERE id=$7 AND "userId"=$8 RETURNING *',
      [
        player.firstname,
        player.lastname,
        player.avatar,
        player.year,
        player.teamId,
        player.position,
        id,
        userId
      ]
    )
    return result.rows[0]
  }

  deletePlayer = async (id: number, userId: number) => {
    const result = await con.query(
      'DELETE FROM players WHERE id = $1 AND "userId" = $2 RETURNING *',
      [id, userId]
    )
    return result.rows[0].id
  }
}
