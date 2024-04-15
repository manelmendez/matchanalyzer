export class Team {
  id: number
  name: string
  avatar: string
  signupDate: Date
  manager: number
  season: number
  competition: number
  userId: number

  constructor ({ id, name, avatar, signupDate, manager, season, competition, userId }) {
    this.id = id
    this.name = name
    this.avatar = avatar
    this.signupDate = signupDate
    this.manager = manager
    this.season = season
    this.competition = competition
    this.userId = userId
  }
}