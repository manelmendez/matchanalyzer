import { Match } from "./match"
import { Team } from "./team"

export type Round = {
  id?: number
  name: string
  date: Date
  competitionId: number
  userId: number
  matches?: Match[] | undefined
  ranking?: Team[]
}