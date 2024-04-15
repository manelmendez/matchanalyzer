export class Competition {
  id: number
  name: string
  avatar: string
  discipline: string
  signupDate: Date
  manager: number
  season: number
  /**
   * Constructor for creating a new instance of the class.
   *
   * @param {type} id - description of parameter
   * @param {type} name - description of parameter
   * @param {type} avatar - description of parameter
   * @param {type} discipline - description of parameter
   * @param {type} signupDate - description of parameter
   * @param {type} manager - description of parameter
   * @param {type} season - description of parameter
   * @return {void} 
   */
  constructor ({ id, name, avatar, discipline, signupDate, manager, season }) {
    this.id = id
    this.name = name
    this.avatar = avatar
    this.discipline = discipline
    this.signupDate = signupDate
    this.manager = manager
    this.season = season
  }
}