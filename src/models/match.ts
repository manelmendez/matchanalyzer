import { Team } from "./team"

export type Match = {
  id?: number
  matchDay?: Date
  localTeam?: Team
  awayTeam?: Team
  localTeamGoals: number
  awayTeamGoals: number
  localTeamId: number
  awayTeamId: number
  competitionId: number
  roundId: number
  userId: number
}