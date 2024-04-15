export class Match {
  id: number
  localTeam: number
  awayTeam: number
  matchDay: Date
  localTeamGoals: number
  awayTeamGoals: number
  competition: number
  round: number
  userId: number
  constructor ({ id, localTeam, awayTeam, matchDay, localTeamGoals, awayTeamGoals, competition, round, userId }) {
    this.id = id
    this.localTeam = localTeam
    this.awayTeam = awayTeam
    this.matchDay = matchDay
    this.localTeamGoals = localTeamGoals
    this.awayTeamGoals = awayTeamGoals
    this.competition = competition
    this.round = round
    this.userId = userId
  }
}