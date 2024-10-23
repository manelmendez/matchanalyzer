import { TeamStats } from "./types"

export interface Team {
  id?: number
  name: string
  avatar: string
  signupDate: Date
  season: number
  managerId?: number
  competitionId?: number
  userId: number
  stats?: TeamStats
}