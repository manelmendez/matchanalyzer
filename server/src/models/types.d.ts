export type Token = {
  sub: UserDataToken,
  iat: number
  exp: number
}

export type UserDataToken = {
  id: number
  email: string
  role: string
}

export type TeamStats = {
  gamesPlayed: number
  homeGamesPlayed: number
  awayGamesPlayed: number
  points: number
  homePoints: number
  awayPoints: number
  wins: number
  homeWins: number
  awayWins: number
  draws: number
  homeDraws: number
  awayDraws: number
  loses: number
  homeLoses: number
  awayLoses: number
  goals: number
  goalDif?: number
  homeGoalDif?: number
  awayGoalDif?: number
  homeGoals: number
  awayGoals: number
  againstGoals: number
  homeAgainstGoals: number
  awayAgainstGoals: number
}

export type Pichichi = {
  playerId: number | undefined
  playerName: string
  totalGoals: number
  roundsGoals: (number | null)[]
}

export type CardItem = {
  playerId: number | undefined
  playerName: string
  totalCards: number
  roundCards: (number | null)[]
}