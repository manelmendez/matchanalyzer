export class MatchPart {
  id: number
  formation: string
  time: number
  team: number
  roundId: number
  userId: number
  matchId: number
  /**
   * Creates a new MatchPart instance.
   * @param {Object} params - The parameters for the new MatchPart.
   * @param {number} params.id - The id of the MatchPart.
   * @param {string} params.formation - The formation of the MatchPart.
   * @param {number} params.time - The time of the MatchPart.
   * @param {number} params.team - The team of the MatchPart.
   * @param {number} params.roundId - The roundId of the MatchPart.
   * @param {number} params.userId - The userId of the MatchPart.
   * @param {number} params.matchId - The matchId of the MatchPart.
   */
  constructor ({ id, formation, time, team, roundId, userId, matchId }) {
    // Assigns the parameters to the corresponding properties
    this.id = id
    this.formation = formation
    this.time = time
    this.team = team
    this.roundId = roundId
    this.userId = userId
    this.matchId = matchId
  }
}