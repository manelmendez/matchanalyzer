import { competitionMutations } from '../mutations/competitionMutations.js'
import * as competitionActions from '../actions/competitionActions.js'

export const competitionModule = {
  namespaced: true,
  state: {
    competitions: [],
    competition: {
      teams: []
    },
    rounds: [],
    match: null,
    matchparts: [],
    minutes: [],
    goals: [],
    assists: [],
    cards: [],
    substitutions: []
  },
  getters: {
    competitions: (state) => {
      return state.competitions
    },
    competition: (state) => {
      state.competitions.rounds = state.rounds
      return state.competition
    },
    competitionTeams: (state) => {
      return state.competition.teams.sort((a, b) => a.name.localeCompare(b.name))
    },
    rounds: (state) => {
      return state.rounds
    },
    round: (state) => (selectedRound) => {
      if (selectedRound == 'latest') {
        return state.rounds[state.rounds.length - 1]
      } else {
        return state.rounds[selectedRound - 1]
      }
    },
    match: (state) => {
      return state.match
    },
    matchpartsByMatch: (state) => (matchId) => {
      if (state.matchparts) {
        return state.matchparts.filter(
          (matchpart) => matchpart.matchId == matchId
        )
      }
    },
    minutesByMatch: (state) => (matchId) => {
      return state.minutes.filter((minute) => minute.matchId == matchId)
    },
    goalsByMatch: (state) => (matchId) => {
      return state.goals.filter((goal) => goal.matchId == matchId)
    },
    assistsByMatch: (state) => (matchId) => {
      return state.assists.filter((assist) => assist.matchId == matchId)
    },
    cardsByMatch: (state) => (matchId) => {
      return state.cards.filter((card) => card.matchId == matchId)
    },
    substitutionsByMatch: (state) => (matchId) => {
      return state.substitutions.filter(
        (substitution) => substitution.matchId == matchId
      )
    },
    minutesByMatchpart: (state) => (matchpartId) => {
      return state.minutes.filter((minute) => minute.matchpart == matchpartId)
    },
    goalsByMatchpart: (state) => (matchpartId) => {
      return state.goals.filter((goal) => goal.matchpart == matchpartId)
    },
    assistsByMatchpart: (state) => (matchpartId) => {
      return state.assists.filter((assist) => assist.matchpart == matchpartId)
    },
    cardsByMatchpart: (state) => (matchpartId) => {
      return state.cards.filter((card) => card.matchpart == matchpartId)
    },
    substitutionsByMatchpart: (state) => (matchpartId) => {
      return state.substitutions.filter(
        (substitution) => substitution.matchpart == matchpartId
      )
    },
    teamById: (state) => (teamId) => {
      return state.competition.teams.find((team) => team.id == teamId)
    },
    matches: (state) => (selectedRound) => {
      const selRound =
        selectedRound == 'latest' ? state.rounds.length - 1 : selectedRound - 1
      if (state.rounds && state.rounds.length != 0) {
        return state.rounds[selRound].matches
      } else {
        return []
      }
    },
    matchById: (state) => (id, selectedRound) => {
      if (state.rounds && state.rounds.length != 0) {
        return state.rounds[
          selectedRound != null
            ? selectedRound - 1
            : state.rounds.length - 1
        ].matches.find((match) => match.id == id)
      }
    },
    roundTeams: (state) => (selectedRound) => {
      if (state.rounds && state.rounds.length != 0) {
        let actualCompetition = { ...state.competition }
        console.log(selectedRound);
        selectedRound = (selectedRound == 'latest') ? state.rounds.length - 1 : selectedRound
        let actualRound = {
          ...state.rounds[
            selectedRound != null
              ? selectedRound - 1
              : state.rounds.length - 1
          ]
        }
        let actualRoundTeams = [...actualCompetition.teams]
        for (let i = 0; i < actualCompetition.teams.length; i++) {
          let found = false
          let j = 0
          while (j < actualRound.matches.length && !found) {
            if (
              actualCompetition.teams[i].id ==
                actualRound.matches[j].localTeam.id ||
              actualCompetition.teams[i].id ==
                actualRound.matches[j].awayTeam.id
            ) {
              found = true
              let index = actualRoundTeams
                .map((x) => {
                  return x.id
                })
                .indexOf(actualCompetition.teams[i].id)
              actualRoundTeams.splice(index, 1)
            }
            j++
          }
        }
        return actualRoundTeams
      }
    },
    rankedTeams: (state) => (selectedRound) => {
      if (state.competition.teams && state.rounds && state.rounds.length != 0) {
        let teams = [...state.competition.teams]
        let updatedTeams = []
        const actualRound =
          selectedRound == 'latest' ? state.rounds.length : selectedRound
        // sumar todas las jornadas hasta la seleccionada
        for (let i = 0; i < teams.length; i++) {
          let updatedTeam = { ...teams[i] }
          let teamStats = {
            gamesPlayed: 0,
            homeGamesPlayed: 0,
            awayGamesPlayed: 0,
            points: 0,
            homePoints: 0,
            awayPoints: 0,
            wins: 0,
            homeWins: 0,
            awayWins: 0,
            draws: 0,
            homeDraws: 0,
            awayDraws: 0,
            loses: 0,
            homeLoses: 0,
            awayLoses: 0,
            goals: 0,
            goalDif: 0,
            homeGoals: 0,
            homeGoalDif: 0,
            awayGoals: 0,
            awayGoalDif: 0,
            againstGoals: 0,
            homeAgainstGoals: 0,
            awayAgainstGoals: 0
          }
          for (let j = 0; j < actualRound; j++) {
            let matches = state.rounds[j].matches
            let x = 0
            let found = false
            while (x < matches.length && !found) {
              if (matches[x].localTeam.id == teams[i].id) {
                teamStats.gamesPlayed += 1
                teamStats.homeGamesPlayed += 1
                teamStats.goals += Number(matches[x].localTeamGoals)
                teamStats.goalDif +=
                  Number(matches[x].localTeamGoals) -
                  Number(matches[x].awayTeamGoals)
                teamStats.homeGoals += Number(matches[x].localTeamGoals)
                teamStats.homeGoalDif +=
                  Number(matches[x].localTeamGoals) -
                  Number(matches[x].awayTeamGoals)
                teamStats.againstGoals += Number(matches[x].awayTeamGoals)
                teamStats.homeAgainstGoals += Number(matches[x].awayTeamGoals)
                if (
                  Number(matches[x].localTeamGoals) >
                  Number(matches[x].awayTeamGoals)
                ) {
                  teamStats.homePoints += 3
                  teamStats.points += 3
                  teamStats.wins += 1
                  teamStats.homeWins += 1
                } else if (
                  Number(matches[x].localTeamGoals) ==
                  Number(matches[x].awayTeamGoals)
                ) {
                  teamStats.homePoints += 1
                  teamStats.points += 1
                  teamStats.draws += 1
                  teamStats.homeDraws += 1
                } else if (
                  Number(matches[x].localTeamGoals) <
                  Number(matches[x].awayTeamGoals)
                ) {
                  teamStats.homePoints += 0
                  teamStats.points += 0
                  teamStats.loses += 1
                  teamStats.homeLoses += 1
                }
                found = true
              } else if (matches[x].awayTeam.id == teams[i].id) {
                teamStats.gamesPlayed += 1
                teamStats.awayGamesPlayed += 1
                teamStats.goals += Number(matches[x].awayTeamGoals)
                teamStats.awayGoals += Number(matches[x].awayTeamGoals)
                teamStats.goalDif +=
                  Number(matches[x].awayTeamGoals) -
                  Number(matches[x].localTeamGoals)
                teamStats.againstGoals += Number(matches[x].localTeamGoals)
                teamStats.awayGoalDif +=
                  Number(matches[x].awayTeamGoals) -
                  Number(matches[x].localTeamGoals)
                teamStats.awayAgainstGoals += Number(matches[x].localTeamGoals)
                if (
                  Number(matches[x].awayTeamGoals) >
                  Number(matches[x].localTeamGoals)
                ) {
                  teamStats.awayPoints += 3
                  teamStats.points += 3
                  teamStats.wins += 1
                  teamStats.awayWins += 1
                } else if (
                  Number(matches[x].awayTeamGoals) ==
                  Number(matches[x].localTeamGoals)
                ) {
                  teamStats.awayPoints += 1
                  teamStats.points += 1
                  teamStats.draws += 1
                  teamStats.awayDraws += 1
                } else if (
                  Number(matches[x].awayTeamGoals) <
                  Number(matches[x].localTeamGoals)
                ) {
                  teamStats.awayPoints += 0
                  teamStats.points += 0
                  teamStats.loses += 1
                  teamStats.awayLoses += 1
                }
                found = true
              }
              x++
            }
          }
          updatedTeam.stats = teamStats
          updatedTeams.push(updatedTeam)
        }
        // esto ordena primero por puntos y luego por diferencia de goles
        return updatedTeams.sort(function (b, a) {
          //si los puntos de los dos equipos son distintos
          if (a.stats.points !== b.stats.points) {
            //devuelve positivo (+) o negativo (-) según quien tenga más
            return a.stats.points - b.stats.points
          }
          //si los puntos son iguales pasa a hacer lo siguiente:
          else if (a.stats.points == b.stats.points) {
            let matches = []
            //coger todos los partidos
            for (let x = 0; x < actualRound; x++) {
              matches = [...matches, ...state.rounds[x].matches]
            }
            let duelMatches = []
            //buscar los partidos que esos 2 equipos hayan jugado entre ellos
            for (let y = 0; y < matches.length; y++) {
              if (
                (matches[y].localTeam.id === a.id &&
                  matches[y].awayTeam.id === b.id) ||
                (matches[y].localTeam.id === b.id &&
                  matches[y].awayTeam.id === a.id)
              ) {
                duelMatches.push(matches[y])
              }
            }
            //buscar diferencia de victorias/empates/derrotas
            let aWin = 0 //1 o 2 segun los que haya ganado
            let aDraw = 0 //1 o 2 segun los que haya empatado
            let aLose = 0 //1 o 2 segun los que haya perdido
            let goalDifference = 0 // positiva o negativa segun resultados, o 0
            for (let z = 0; z < duelMatches.length; z++) {
              if (
                duelMatches[z].localTeam.id == a.id &&
                Number(duelMatches[z].localTeamGoals) >
                  Number(duelMatches[z].awayTeamGoals)
              ) {
                aWin++
                goalDifference +=
                  Number(duelMatches[z].localTeamGoals) -
                  Number(duelMatches[z].awayTeamGoals)
              } else if (
                duelMatches[z].awayTeam.id == a.id &&
                Number(duelMatches[z].awayTeamGoals) >
                  Number(duelMatches[z].localTeamGoals)
              ) {
                aWin++
                goalDifference +=
                  Number(duelMatches[z].awayTeamGoals) -
                  Number(duelMatches[z].localTeamGoals)
              } else if (
                duelMatches[z].localTeam.id == a.id &&
                Number(duelMatches[z].localTeamGoals) ==
                  Number(duelMatches[z].awayTeamGoals)
              ) {
                aDraw++
              } else if (
                duelMatches[z].awayTeam.id == a.id &&
                Number(duelMatches[z].awayTeamGoals) ==
                  Number(duelMatches[z].localTeamGoals)
              ) {
                aDraw++
              } else if (
                duelMatches[z].localTeam.id == a.id &&
                Number(duelMatches[z].localTeamGoals) <
                  Number(duelMatches[z].awayTeamGoals)
              ) {
                aLose++
                goalDifference +=
                  Number(duelMatches[z].localTeamGoals) -
                  Number(duelMatches[z].awayTeamGoals)
              } else if (
                duelMatches[z].awayTeam.id == a.id &&
                Number(duelMatches[z].awayTeamGoals) <
                  Number(duelMatches[z].localTeamGoals)
              ) {
                aLose++
                goalDifference +=
                  Number(duelMatches[z].awayTeamGoals) -
                  Number(duelMatches[z].localTeamGoals)
              }
            }

            //si se han jugado los 2 partidos entre ellos
            if (duelMatches.length == 2) {
              if (aWin == 2 || (aWin == 1 && aDraw == 1)) {
                return 1
              } else if (aLose == 2 || (aLose == 1 && aDraw == 1)) {
                return -1
              }
              //si es igual, buscar diferencia de goles individual (no cuenta doble fuera de casa)
              //si los puntos de los equipos son iguales y la diferencia de goles es distinta
              else {
                if (goalDifference > 0) {
                  return 1
                } else if (goalDifference < 0) {
                  return -1
                } else {
                  // si la diferencia de goles es igual, devuelve +1 o -1 según quien tenga más goles
                  return a.stats.goals - a.stats.againstGoals >
                    b.stats.goals - b.stats.againstGoals
                    ? 1
                    : -1
                }
              }
            }
            //si solo se ha jugado 1 solo depende de victoria/derrota
            else if (duelMatches.length == 1) {
              if (aWin == 1) {
                return 1
              } else if (aLose == 1) {
                return -1
              } else {
                //si empate
                // si la diferencia de goles es distinta
                if (goalDifference > 0) {
                  return 1
                } else if (goalDifference < 0) {
                  return -1
                } else {
                  // si la diferencia de goles es igual, devuelve +1 o -1 según quien tenga más goles
                  return a.stats.goals - a.stats.againstGoals >
                    b.stats.goals - b.stats.againstGoals
                    ? 1
                    : -1
                }
              }
            } else {
              // si no se ha jugado ninguno la diferencia de goles particular no importa
              // se comprueba la general:
              if (
                a.stats.goals - a.stats.againstGoals >
                b.stats.goals - b.stats.againstGoals
              ) {
                return 1
              } else if (
                a.stats.goals - a.stats.againstGoals <
                b.stats.goals - b.stats.againstGoals
              ) {
                return -1
              } else {
                // si la general es igual se comprueban los goles a favor
                if (a.stats.goals > b.stats.goals) {
                  return 1
                } else {
                  return -1
                }
              }
            }
          }
        })
      } else {
        return []
      }
    },
    topScorers: (state, getters) => (selectedRound) => {
      selectedRound = (selectedRound == 'latest') ? state.rounds.length - 1 : selectedRound
      let orderTeams = JSON.parse(
        JSON.stringify(getters.rankedTeams(selectedRound))
      )
      return JSON.parse(
        JSON.stringify(
          orderTeams.sort(function (b, a) {
            return a.stats.goals - b.stats.goals
          })
        )
      )
    },
    mostTrashed: (state, getters) => (selectedRound) => {
      selectedRound = (selectedRound == 'latest') ? state.rounds.length - 1 : selectedRound
      let orderTeams = JSON.parse(
        JSON.stringify(getters.rankedTeams(selectedRound))
      )
      return JSON.parse(
        JSON.stringify(
          orderTeams.sort(function (b, a) {
            return b.stats.againstGoals - a.stats.againstGoals
          })
        )
      )
    },
    topDifference: (state, getters) => (selectedRound) => {
      selectedRound = (selectedRound == 'latest') ? state.rounds.length - 1 : selectedRound
      let orderTeams = JSON.parse(
        JSON.stringify(getters.rankedTeams(selectedRound))
      )
      return JSON.parse(
        JSON.stringify(
          orderTeams.sort(function (b, a) {
            return a.stats.goalDif - b.stats.goalDif
          })
        )
      )
    },
    statsPerRound: (state) => {
      if (state.competition.teams && state.rounds && state.rounds.length != 0) {
        let teams = [...state.competition.teams]
        let roundRankings = []
        for (let r = 0; r < state.rounds.length; r++) {
          let roundRanking = { ...state.rounds[r] }
          let updatedTeams = []
          // sumar todas las jornadas hasta la seleccionada
          for (let i = 0; i < teams.length; i++) {
            let updatedTeam = { ...teams[i] }
            let teamStats = {
              gamesPlayed: 0,
              homeGamesPlayed: 0,
              awayGamesPlayed: 0,
              points: 0,
              homePoints: 0,
              awayPoints: 0,
              wins: 0,
              homeWins: 0,
              awayWins: 0,
              draws: 0,
              homeDraws: 0,
              awayDraws: 0,
              loses: 0,
              homeLoses: 0,
              awayLoses: 0,
              goals: 0,
              homeGoals: 0,
              awayGoals: 0,
              againstGoals: 0,
              homeAgainstGoals: 0,
              awayAgainstGoals: 0
            }
            let actualRound = r + 1
            for (let j = 0; j < actualRound; j++) {
              let matches = state.rounds[j].matches
              let x = 0
              let found = false
              while (x < matches.length && !found) {
                if (matches[x].localTeam.id == teams[i].id) {
                  teamStats.gamesPlayed += 1
                  teamStats.homeGamesPlayed += 1
                  teamStats.goals += Number(matches[x].localTeamGoals)
                  teamStats.homeGoals += Number(matches[x].localTeamGoals)
                  teamStats.againstGoals += Number(matches[x].awayTeamGoals)
                  teamStats.homeAgainstGoals += Number(matches[x].awayTeamGoals)
                  if (
                    Number(matches[x].localTeamGoals) >
                    Number(matches[x].awayTeamGoals)
                  ) {
                    teamStats.homePoints += 3
                    teamStats.points += 3
                    teamStats.wins += 1
                    teamStats.homeWins += 1
                  } else if (
                    Number(matches[x].localTeamGoals) ==
                    Number(matches[x].awayTeamGoals)
                  ) {
                    teamStats.homePoints += 1
                    teamStats.points += 1
                    teamStats.draws += 1
                    teamStats.homeDraws += 1
                  } else if (
                    Number(matches[x].localTeamGoals) <
                    Number(matches[x].awayTeamGoals)
                  ) {
                    teamStats.homePoints += 0
                    teamStats.points += 0
                    teamStats.loses += 1
                    teamStats.homeLoses += 1
                  }
                  found = true
                } else if (matches[x].awayTeam.id == teams[i].id) {
                  teamStats.gamesPlayed += 1
                  teamStats.awayGamesPlayed += 1
                  teamStats.goals += Number(matches[x].awayTeamGoals)
                  teamStats.awayGoals += Number(matches[x].awayTeamGoals)
                  teamStats.againstGoals += Number(matches[x].localTeamGoals)
                  teamStats.awayAgainstGoals += Number(
                    matches[x].localTeamGoals
                  )
                  if (
                    Number(matches[x].awayTeamGoals) >
                    Number(matches[x].localTeamGoals)
                  ) {
                    teamStats.awayPoints += 3
                    teamStats.points += 3
                    teamStats.wins += 1
                    teamStats.awayWins += 1
                  } else if (
                    Number(matches[x].awayTeamGoals) ==
                    Number(matches[x].localTeamGoals)
                  ) {
                    teamStats.awayPoints += 1
                    teamStats.points += 1
                    teamStats.draws += 1
                    teamStats.awayDraws += 1
                  } else if (
                    Number(matches[x].awayTeamGoals) <
                    Number(matches[x].localTeamGoals)
                  ) {
                    teamStats.awayPoints += 0
                    teamStats.points += 0
                    teamStats.loses += 1
                    teamStats.awayLoses += 1
                  }
                  found = true
                }
                x++
              }
            }
            updatedTeam.stats = teamStats
            updatedTeams.push(updatedTeam)
          }
          // esto ordena primero por puntos y luego por diferencia de goles
          roundRanking.ranking = updatedTeams.sort(function (b, a) {
            //si los puntos de los dos equipos son distintos
            if (a.stats.points !== b.stats.points) {
              //devuelve positivo (+) o negativo (-) según quien tenga más
              return a.stats.points - b.stats.points
            }
            //si los puntos son iguales pasa a hacer lo siguiente:
            else if (a.stats.points == b.stats.points) {
              let matches = []
              //coger todos los partidos
              for (let x = 0; x < state.rounds.length; x++) {
                matches = [...matches, ...state.rounds[x].matches]
              }
              let duelMatches = []
              //buscar los partidos que esos 2 equipos hayan jugado entre ellos
              for (let y = 0; y < matches.length; y++) {
                if (
                  (matches[y].localTeam.id === a.id &&
                    matches[y].awayTeam.id === b.id) ||
                  (matches[y].localTeam.id === b.id &&
                    matches[y].awayTeam.id === a.id)
                ) {
                  duelMatches.push(matches[y])
                }
              }
              //buscar diferencia de victorias/empates/derrotas
              let aWin = 0
              let aDraw = 0
              let aLose = 0
              let goalDifference = 0
              for (let z = 0; z < duelMatches.length; z++) {
                if (
                  duelMatches[z].localTeam.id == a.id &&
                  Number(duelMatches[z].localTeamGoals) >
                    Number(duelMatches[z].awayTeamGoals)
                ) {
                  aWin++
                  goalDifference +=
                    Number(duelMatches[z].localTeamGoals) -
                    Number(duelMatches[z].awayTeamGoals)
                } else if (
                  duelMatches[z].awayTeam.id == a.id &&
                  Number(duelMatches[z].awayTeamGoals) >
                    Number(duelMatches[z].localTeamGoals)
                ) {
                  aWin++
                  goalDifference +=
                    Number(duelMatches[z].awayTeamGoals) -
                    Number(duelMatches[z].localTeamGoals)
                } else if (
                  duelMatches[z].localTeam.id == a.id &&
                  Number(duelMatches[z].localTeamGoals) ==
                    Number(duelMatches[z].awayTeamGoals)
                ) {
                  aDraw++
                } else if (
                  duelMatches[z].awayTeam.id == a.id &&
                  Number(duelMatches[z].awayTeamGoals) ==
                    Number(duelMatches[z].localTeamGoals)
                ) {
                  aDraw++
                } else if (
                  duelMatches[z].localTeam.id == a.id &&
                  Number(duelMatches[z].localTeamGoals) <
                    Number(duelMatches[z].awayTeamGoals)
                ) {
                  aLose++
                  goalDifference +=
                    Number(duelMatches[z].localTeamGoals) -
                    Number(duelMatches[z].awayTeamGoals)
                } else if (
                  duelMatches[z].awayTeam.id == a.id &&
                  Number(duelMatches[z].awayTeamGoals) <
                    Number(duelMatches[z].localTeamGoals)
                ) {
                  aLose++
                  goalDifference +=
                    Number(duelMatches[z].awayTeamGoals) -
                    Number(duelMatches[z].localTeamGoals)
                }
              }
              //si se han jugado los 2 partidos entre ellos
              if (duelMatches.length == 2) {
                if (aWin == 2 || (aWin == 1 && aDraw == 1)) {
                  return 1
                } else if (aLose == 2 || (aLose == 1 && aDraw == 1)) {
                  return -1
                }
                //si es igual, buscar diferencia de goles individual (no cuenta doble fuera de casa)
                else {
                  if (goalDifference > 0) {
                    return 1
                  } else {
                    return -1
                  }
                }
              }
              //si solo se ha jugado 1
              else if (duelMatches.length == 1) {
                if (aWin == 1) {
                  return 1
                } else if (aLose == 1) {
                  return -1
                }
              }
            }
            //si el goal average particular es igual pasa a hacer lo siguiente:
            //si la diferencia de goles entre los dos equipos es igual en ambos
            else if (
              a.stats.goals - a.stats.againstGoals ===
              b.stats.goals - b.stats.againstGoals
            ) {
              //devuelve 0
              return 0
            }
            //si los puntos de los equipos son iguales y la diferencia de goles es distinta
            //devuelve +1 o -1 según quien tenga más goles
            return a.stats.goals - a.stats.againstGoals >
              b.stats.goals - b.stats.againstGoals
              ? 1
              : -1
          })
          roundRankings.push(roundRanking)
        }
        return roundRankings
      } else {
        return []
      }
    },
    teamMatchesPerRound: (state) => (id) => {
      if (state.competition.teams && state.rounds && state.rounds.length != 0) {
        let teamMatchesPerRound = []
        for (let r = 0; r < state.rounds.length; r++) {
          let found = false
          let m = 0
          while (m < state.rounds[r].matches.length && !found) {
            let match = state.rounds[r].matches[m]
            if (match.localTeam.id == id || match.awayTeam.id == id) {
              teamMatchesPerRound.push(match)
              found = true
            }
            m++
          }
        }
        return teamMatchesPerRound
      } else {
        return []
      }
    },
    teamsNotPlayedThisRound: (state, getters) => (selectedRound) => {
      selectedRound = (selectedRound == 'latest') ? state.rounds.length - 1 : selectedRound
      if (state.competition.teams && state.rounds && state.rounds.length != 0) {
        let teamsPlayed = []
        for (const match of getters.round(selectedRound).matches) {
          teamsPlayed.push(match.localTeam)
          teamsPlayed.push(match.awayTeam)
        }
        let teamsNotPlayed = state.competition.teams.filter(a => !teamsPlayed.some(b => a.id == b.id))
        return teamsNotPlayed
      } else {
        return []
      }
    }
  },
  mutations: {
    ...competitionMutations
  },
  actions: {
    ...competitionActions
  }
}
