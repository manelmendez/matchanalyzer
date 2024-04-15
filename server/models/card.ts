export class Card {
  id: number;
  minute: number;
  type: string;
  player: number;
  matchId: number;
  roundId: number;
  userId: number;
  matchpart: number;
  constructor ({ id, minute, type, player, matchId, roundId, userId, matchpart }) {
    this.id = id
    this.minute = minute
    this.type = type
    this.player = player
    this.matchId = matchId
    this.roundId = roundId
    this.userId = userId
    this.matchpart = matchpart
  }
}