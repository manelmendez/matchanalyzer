import con from '../config/postgres.js'
import {Assist} from '../models/assist.js'

export class AssistService {
  findById = async (id: number, userId: number) => {
    const result = await con.query<Assist>(
      'SELECT * FROM assists WHERE id = $1 AND "userId" = $2',
      [id, userId]
    );
    return result.rows[0];
  };

  findByMatch = async (matchId: number, userId: number) => {
    const result = await con.query(
      'SELECT * FROM assists WHERE "matchId" = $1 AND "userId" = $2',
      [matchId, userId]
    )
    return result.rows
  }

  saveAssist = async (assist: Assist) => {
    const result = await con.query(
      'INSERT INTO assists(type, "goalId", "matchId", "matchpartId", "roundId", "playerId", "userId") ' +
      'VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [
        assist.type,
        assist.goalId,
        assist.matchId,
        assist.matchpartId,
        assist.roundId,
        assist.playerId,
        assist.userId
      ]
    )
    return result.rows[0]
  }

  deleteAssist = async (assistId: number, userId: number) => {
    const result = await con.query(
      'DELETE FROM assists WHERE id = $1 AND "userId"=$2 RETURNING *',
      [assistId, userId]
    )
    return result.rows[0].id
  }
}
