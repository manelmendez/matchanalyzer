import { Team } from "./team"

export type Competition = {
  id?: number
  name: string
  avatar?: string
  discipline: string
  signupDate?: Date
  managerId: number
  season: number
  userId: number
  category: string
  teams?: Team[]
}