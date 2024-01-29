import con from '../config/postgres.js'

export class SubstitutionModel {
  static findById = async ({ id, userId }) => {
    const result = await con.query(
      'SELECT * FROM substitutions WHERE id = $1 AND "userId" = $2',
      [id, userId]
    )
    return result.rows[0]
  }

  static findByMatch = async ({ matchId, userId }) => {
    const result = await con.query(
      'SELECT * FROM substitutions WHERE "matchId" = $1 AND "userId" = $2',
      [matchId, userId]
    )
    return result.rows
  }

  static saveSubstitution = async ({ substitution }) => {
    const result = await con.query(
      'INSERT INTO substitutions ("playerIn", "playerOut", minute, "matchId", "roundId", "userId", matchpart) ' +
      'VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [
        substitution.playerIn,
        substitution.playerOut,
        substitution.minute,
        substitution.matchId,
        substitution.roundId,
        substitution.userId,
        substitution.matchpart
      ]
    )
    return result.rows[0]
  }

  static deleteSubstitution = async ({ id, userId }) => {
    const result = await con.query(
      'DELETE FROM substitutions WHERE id = $1 AND "userId"=$2 RETURNING *',
      [id, userId]
    )
    return result.rows[0].id
  }
}
