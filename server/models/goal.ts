export class Goal {
  id: number
  minute: number
  type: string
  player: number
  matchId: number
  roundId: number
  userId: number
  matchpartId: number
  /**
   * Constructor for creating a new instance of the class.
   *
   * @param {object} id - the id of the instance
   * @param {number} minute - the minute of the instance
   * @param {string} type - the type of the instance
   * @param {string} player - the player of the instance
   * @param {string} matchId - the match id of the instance
   * @param {string} roundId - the round id of the instance
   * @param {string} userId - the user id of the instance
   * @param {string} matchpart - the match part id of the instance
   * @return {void} 
   */
  constructor ({ id, minute, type, player, matchId, roundId, userId, matchpartId }) {
    this.id = id
    this.minute = minute
    this.type = type
    this.player = player
    this.matchId = matchId
    this.roundId = roundId
    this.userId = userId
    this.matchpartId = matchpartId
  }
}