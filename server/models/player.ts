export class Player {
  id: number
  name: string
  firstname: string
  lastname: string
  position: string
  year: number
  avatar: string
  guest: boolean
  team: string
  userId: number
  manager: number
  competition: number
  season: number
  constructor ({ id, name, firstname, lastname, position, year, avatar, guest, team, userId, manager, competition, season }) {
    this.id = id
    this.name = name
    this.firstname = firstname
    this.lastname = lastname
    this.position = position
    this.year = year
    this.avatar = avatar
    this.guest = guest
    this.team = team
    this.userId = userId
    this.manager = manager
    this.competition = competition
    this.season = season
  }
}