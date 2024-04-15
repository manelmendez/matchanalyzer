export class User {
  id: number
  email: string
  firstname: string
  lastname: string
  avatar: string
  provider: string
  provider_id: string
  password: string
  signupDate: Date
  lastLogin: Date
  constructor ({ id, email, firstname, lastname, avatar, provider, provider_id, password, signupDate, lastLogin }) {
    this.id = id
    this.email = email
    this.firstname = firstname
    this.lastname = lastname
    this.avatar = avatar
    this.provider = provider
    this.provider_id = provider_id
    this.password = password
    this.signupDate = signupDate
    this.lastLogin = lastLogin
  }
}