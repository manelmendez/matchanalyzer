import { competitionMutations } from '../mutations/competitionMutations'
import * as competitionActions from '../actions/competitionActions'

export const competitionModule = {
  namespaced: true,
  state: {
    competitions: [],
    competition: {
      teams: []
    },
    rounds: [],
    selectedRound: null,
    minutes: [],
    goals: [],
    assists: [],
    cards: [],
    substitutions: []
  },
  getters: {
    competitions: state => {
      return state.competitions
    },
    competition: state => {
      state.competitions.rounds = state.rounds
      return state.competition
    },
    rounds: state => {
      return state.rounds
    },
    round: state => {
      return state.rounds[state.selectedRound - 1]
    },
    selectedRound: state => {
      if (state.selectedRound==null) {
        if (state.rounds) {
          return state.rounds.length
        }
      }
      else{
        return state.selectedRound
      }
    },
    matches: state => {
      if (state.rounds && state.rounds.length != 0) {
        return state.rounds[state.selectedRound!=null ? state.selectedRound -1 : state.rounds.length -1].matches
      } else {
        return []
      }
    },
    roundTeams: state => {
      if (state.rounds && state.rounds.length != 0){
        let actualCompetition = {...state.competition}
        let actualRound = {...state.rounds[state.selectedRound!=null ? state.selectedRound -1 : state.rounds.length -1]}
        let actualRoundTeams = [...actualCompetition.teams]
        for (var i = 0; i < actualCompetition.teams.length; i++) {
          let found = false
          let j = 0
          while (j < actualRound.matches.length && !found) {
            if(actualCompetition.teams[i].id == actualRound.matches[j].localTeam.id || actualCompetition.teams[i].id == actualRound.matches[j].awayTeam.id){
              found = true
              var index = actualRoundTeams.map(x => {
                return x.id;
              }).indexOf(actualCompetition.teams[i].id);
              actualRoundTeams.splice(index, 1);
            }
            j++
          }
        }
        return actualRoundTeams
      }
    },
    rankedTeams: state => {
      if (state.competition.teams && state.rounds && state.rounds.length != 0){
        let teams = [...state.competition.teams]
        let updatedTeams = []
        // sumar todas las jornadas hasta la seleccionada
        for (let i = 0; i < teams.length; i++) {
          let updatedTeam = {...teams[i]}
          let teamStats = {
            gamesPlayed:0,
            homeGamesPlayed:0,
            awayGamesPlayed:0,
            points:0,
            homePoints:0,
            awayPoints:0,
            wins:0,
            homeWins:0,
            awayWins:0,
            draws:0,
            homeDraws:0,
            awayDraws:0,
            loses:0,
            homeLoses:0,
            awayLoses:0,
            goals:0,
            goalDif:0,
            homeGoals:0,
            homeGoalDif: 0,
            awayGoals:0,
            awayGoalDif: 0,
            againstGoals:0,
            homeAgainstGoals:0,
            awayAgainstGoals:0
          }
          let actualRound = state.selectedRound
          for (let j = 0; j < actualRound; j++) {
            let matches = state.rounds[j].matches
            let x = 0
            let found = false
            while(x<matches.length && !found) {
              if (matches[x].localTeam.id == teams[i].id) {  
                teamStats.gamesPlayed+=1
                teamStats.homeGamesPlayed+=1
                teamStats.goals+= matches[x].localTeamGoals
                teamStats.goalDif+= matches[x].localTeamGoals-matches[x].awayTeamGoals
                teamStats.homeGoals+= matches[x].localTeamGoals
                teamStats.homeGoalDif+= matches[x].localTeamGoals-matches[x].awayTeamGoals
                teamStats.againstGoals+= matches[x].awayTeamGoals
                teamStats.homeAgainstGoals+= matches[x].awayTeamGoals
                if (matches[x].localTeamGoals > matches[x].awayTeamGoals) {
                  teamStats.homePoints+= 3
                  teamStats.points+= 3
                  teamStats.wins+= 1
                  teamStats.homeWins+= 1
                }
                else if (matches[x].localTeamGoals == matches[x].awayTeamGoals) {
                  teamStats.homePoints += 1
                  teamStats.points+= 1
                  teamStats.draws+= 1
                  teamStats.homeDraws+= 1
                }
                else if (matches[x].localTeamGoals < matches[x].awayTeamGoals) {
                  teamStats.homePoints += 0
                  teamStats.points+= 0
                  teamStats.loses+= 1
                  teamStats.homeLoses+= 1
                }
                found=true
              }
              else if (matches[x].awayTeam.id == teams[i].id) {
                teamStats.gamesPlayed+=1
                teamStats.awayGamesPlayed+=1
                teamStats.goals+= matches[x].awayTeamGoals
                teamStats.awayGoals+= matches[x].awayTeamGoals
                teamStats.goalDif+= matches[x].awayTeamGoals-matches[x].localTeamGoals
                teamStats.againstGoals+= matches[x].localTeamGoals
                teamStats.awayGoalDif+= matches[x].awayTeamGoals-matches[x].localTeamGoals
                teamStats.awayAgainstGoals+= matches[x].localTeamGoals
                if (matches[x].awayTeamGoals > matches[x].localTeamGoals) {
                  teamStats.awayPoints += 3
                  teamStats.points+= 3
                  teamStats.wins+= 1
                  teamStats.awayWins+= 1
                }
                else if (matches[x].awayTeamGoals == matches[x].localTeamGoals) {
                  teamStats.awayPoints += 1
                  teamStats.points+= 1
                  teamStats.draws+= 1
                  teamStats.awayDraws+= 1
                }
                else if (matches[x].awayTeamGoals < matches[x].localTeamGoals) {
                  teamStats.awayPoints += 0
                  teamStats.points+= 0
                  teamStats.loses+= 1
                  teamStats.awayLoses+= 1
                }
                found=true
              }
              x++
            }
          }          
          updatedTeam.stats = teamStats
          updatedTeams.push(updatedTeam)
        }
        // esto ordena primero por puntos y luego por diferencia de goles
        return updatedTeams.sort(function(b, a) {
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
              matches=[...matches,...state.rounds[x].matches]
            }
            let duelMatches = []
            //buscar los partidos que esos 2 equipos hayan jugado entre ellos
            for (let y = 0; y < matches.length; y++) {
              if ((matches[y].localTeam.id===a.id && matches[y].awayTeam.id===b.id) || (matches[y].localTeam.id===b.id && matches[y].awayTeam.id===a.id)) {
                duelMatches.push(matches[y])
              }
            }
            //buscar diferencia de victorias/empates/derrotas
            let aWin=0
            let aDraw=0
            let aLose=0
            let goalDifference=0
            for (let z = 0; z < duelMatches.length; z++) {
              if(duelMatches[z].localTeam.id==a.id && Number(duelMatches[z].localTeamGoals)>Number(duelMatches[z].awayTeamGoals)){
                aWin++
                goalDifference+=Number(duelMatches[z].localTeamGoals)-Number(duelMatches[z].awayTeamGoals)
              }
              else if(duelMatches[z].awayTeam.id==a.id && Number(duelMatches[z].awayTeamGoals)>Number(duelMatches[z].localTeamGoals)){
                aWin++
                goalDifference+=Number(duelMatches[z].awayTeamGoals)-Number(duelMatches[z].localTeamGoals)
              }
              else if(duelMatches[z].localTeam.id==a.id && Number(duelMatches[z].localTeamGoals)==Number(duelMatches[z].awayTeamGoals)){
                aDraw++
              }
              else if(duelMatches[z].awayTeam.id==a.id && Number(duelMatches[z].awayTeamGoals)==Number(duelMatches[z].localTeamGoals)){
                aDraw++
              }
              else if(duelMatches[z].localTeam.id==a.id && Number(duelMatches[z].localTeamGoals)<Number(duelMatches[z].awayTeamGoals)){
                aLose++
                goalDifference+=Number(duelMatches[z].localTeamGoals)-Number(duelMatches[z].awayTeamGoals)
              }
              else if(duelMatches[z].awayTeam.id==a.id && Number(duelMatches[z].awayTeamGoals)<Number(duelMatches[z].localTeamGoals)){
                aLose++
                goalDifference+=Number(duelMatches[z].awayTeamGoals)-Number(duelMatches[z].localTeamGoals)
              }
            }
            //si se han jugado los 2 partidos entre ellos
            if(duelMatches.length==2){
              if (aWin==2 || (aWin==1 && aDraw==1)) {
                return 1
              }
              else if (aLose==2 || (aLose==1 && aDraw==1)) {
                return -1
              }
              //si es igual, buscar diferencia de goles individual (no cuenta doble fuera de casa)
              else {
                if (goalDifference>0) {
                  return 1
                }
                else {
                  return -1
                }
              }
            }
            //si solo se ha jugado 1
            else if (duelMatches.length==1){
              if (aWin==1) {
                return 1
              }
              else if (aLose==1) {
                return -1
              }
            }
          }
          //si el goal average particular es igual pasa a hacer lo siguiente:
          //si la diferencia de goles entre los dos equipos es igual en ambos
          else if (a.stats.goals-a.stats.againstGoals === b.stats.goals-b.stats.againstGoals) {
            //devuelve 0
            return 0;
          }
          //si los puntos de los equipos son iguales y la diferencia de goles es distinta
          //devuelve +1 o -1 según quien tenga más goles
          return (a.stats.goals-a.stats.againstGoals) > (b.stats.goals-b.stats.againstGoals) ? 1 : -1;
        })
      }
      else {
        return []
      }
    },
    topScorers: (state, getters) => {
      let orderTeams = JSON.parse(JSON.stringify(getters.rankedTeams))
      return JSON.parse(JSON.stringify(orderTeams.sort(function(b, a) {
        return a.stats.goals - b.stats.goals      
      })))  
    },
    mostTrashed: (state, getters) => {
      let orderTeams = JSON.parse(JSON.stringify(getters.rankedTeams))
      return JSON.parse(JSON.stringify(orderTeams.sort(function(b, a) {
        return  b.stats.againstGoals - a.stats.againstGoals  
      })))
    },
    topDifference: (state, getters) => {
      let orderTeams = JSON.parse(JSON.stringify(getters.rankedTeams))
      return JSON.parse(JSON.stringify(orderTeams.sort(function(b, a) {
        return a.stats.goalDif - b.stats.goalDif
      })))
    },
    statsPerRound: state => {
      if (state.competition.teams && state.rounds && state.rounds.length != 0){
        let teams = [...state.competition.teams]
        let roundRankings = []
        for (let r = 0; r < state.rounds.length; r++) {
          let roundRanking = {...state.rounds[r]}
          let updatedTeams = []
          // sumar todas las jornadas hasta la seleccionada
          for (let i = 0; i < teams.length; i++) {
            let updatedTeam = {...teams[i]}
            let teamStats = {
              gamesPlayed:0,
              homeGamesPlayed:0,
              awayGamesPlayed:0,
              points:0,
              homePoints:0,
              awayPoints:0,
              wins:0,
              homeWins:0,
              awayWins:0,
              draws:0,
              homeDraws:0,
              awayDraws:0,
              loses:0,
              homeLoses:0,
              awayLoses:0,
              goals:0,
              homeGoals:0,
              awayGoals:0,
              againstGoals:0,
              homeAgainstGoals:0,
              awayAgainstGoals:0
            }
            let actualRound = r + 1
            for (let j = 0; j < actualRound; j++) {
              let matches = state.rounds[j].matches
              let x = 0
              let found = false
              while(x<matches.length && !found) {
                if (matches[x].localTeam.id == teams[i].id) {  
                  teamStats.gamesPlayed+=1
                  teamStats.homeGamesPlayed+=1
                  teamStats.goals+= matches[x].localTeamGoals
                  teamStats.homeGoals+= matches[x].localTeamGoals
                  teamStats.againstGoals+= matches[x].awayTeamGoals
                  teamStats.homeAgainstGoals+= matches[x].awayTeamGoals
                  if (matches[x].localTeamGoals > matches[x].awayTeamGoals) {
                    teamStats.homePoints+= 3
                    teamStats.points+= 3
                    teamStats.wins+= 1
                    teamStats.homeWins+= 1
                  }
                  else if (matches[x].localTeamGoals == matches[x].awayTeamGoals) {
                    teamStats.homePoints += 1
                    teamStats.points+= 1
                    teamStats.draws+= 1
                    teamStats.homeDraws+= 1
                  }
                  else if (matches[x].localTeamGoals < matches[x].awayTeamGoals) {
                    teamStats.homePoints += 0
                    teamStats.points+= 0
                    teamStats.loses+= 1
                    teamStats.homeLoses+= 1
                  }
                  found=true
                }
                else if (matches[x].awayTeam.id == teams[i].id) {
                  teamStats.gamesPlayed+=1
                  teamStats.awayGamesPlayed+=1
                  teamStats.goals+= matches[x].awayTeamGoals
                  teamStats.awayGoals+= matches[x].awayTeamGoals
                  teamStats.againstGoals+= matches[x].localTeamGoals
                  teamStats.awayAgainstGoals+= matches[x].localTeamGoals
                  if (matches[x].awayTeamGoals > matches[x].localTeamGoals) {
                    teamStats.awayPoints += 3
                    teamStats.points+= 3
                    teamStats.wins+= 1
                    teamStats.awayWins+= 1
                  }
                  else if (matches[x].awayTeamGoals == matches[x].localTeamGoals) {
                    teamStats.awayPoints += 1
                    teamStats.points+= 1
                    teamStats.draws+= 1
                    teamStats.awayDraws+= 1
                  }
                  else if (matches[x].awayTeamGoals < matches[x].localTeamGoals) {
                    teamStats.awayPoints += 0
                    teamStats.points+= 0
                    teamStats.loses+= 1
                    teamStats.awayLoses+= 1
                  }
                  found=true
                }
                x++
              }
            }          
            updatedTeam.stats = teamStats
            updatedTeams.push(updatedTeam)
          }
          // esto ordena primero por puntos y luego por diferencia de goles
          roundRanking.ranking = updatedTeams.sort(function(b, a) {
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
                matches=[...matches,...state.rounds[x].matches]
              }
              let duelMatches = []
              //buscar los partidos que esos 2 equipos hayan jugado entre ellos
              for (let y = 0; y < matches.length; y++) {
                if ((matches[y].localTeam.id===a.id && matches[y].awayTeam.id===b.id) || (matches[y].localTeam.id===b.id && matches[y].awayTeam.id===a.id)) {
                  duelMatches.push(matches[y])
                }
              }
              //buscar diferencia de victorias/empates/derrotas
              let aWin=0
              let aDraw=0
              let aLose=0
              let goalDifference=0
              for (let z = 0; z < duelMatches.length; z++) {
                if(duelMatches[z].localTeam.id==a.id && Number(duelMatches[z].localTeamGoals)>Number(duelMatches[z].awayTeamGoals)){
                  aWin++
                  goalDifference+=Number(duelMatches[z].localTeamGoals)-Number(duelMatches[z].awayTeamGoals)
                }
                else if(duelMatches[z].awayTeam.id==a.id && Number(duelMatches[z].awayTeamGoals)>Number(duelMatches[z].localTeamGoals)){
                  aWin++
                  goalDifference+=Number(duelMatches[z].awayTeamGoals)-Number(duelMatches[z].localTeamGoals)
                }
                else if(duelMatches[z].localTeam.id==a.id && Number(duelMatches[z].localTeamGoals)==Number(duelMatches[z].awayTeamGoals)){
                  aDraw++
                }
                else if(duelMatches[z].awayTeam.id==a.id && Number(duelMatches[z].awayTeamGoals)==Number(duelMatches[z].localTeamGoals)){
                  aDraw++
                }
                else if(duelMatches[z].localTeam.id==a.id && Number(duelMatches[z].localTeamGoals)<Number(duelMatches[z].awayTeamGoals)){
                  aLose++
                  goalDifference+=Number(duelMatches[z].localTeamGoals)-Number(duelMatches[z].awayTeamGoals)
                }
                else if(duelMatches[z].awayTeam.id==a.id && Number(duelMatches[z].awayTeamGoals)<Number(duelMatches[z].localTeamGoals)){
                  aLose++
                  goalDifference+=Number(duelMatches[z].awayTeamGoals)-Number(duelMatches[z].localTeamGoals)
                }
              }
              //si se han jugado los 2 partidos entre ellos
              if(duelMatches.length==2){
                if (aWin==2 || (aWin==1 && aDraw==1)) {
                  return 1
                }
                else if (aLose==2 || (aLose==1 && aDraw==1)) {
                  return -1
                }
                //si es igual, buscar diferencia de goles individual (no cuenta doble fuera de casa)
                else {
                  if (goalDifference>0) {
                    return 1
                  }
                  else {
                    return -1
                  }
                }
              }
              //si solo se ha jugado 1
              else if (duelMatches.length==1){
                if (aWin==1) {
                  return 1
                }
                else if (aLose==1) {
                  return -1
                }
              }
            }
            //si el goal average particular es igual pasa a hacer lo siguiente:
            //si la diferencia de goles entre los dos equipos es igual en ambos
            else if (a.stats.goals-a.stats.againstGoals === b.stats.goals-b.stats.againstGoals) {
              //devuelve 0
              return 0;
            }
            //si los puntos de los equipos son iguales y la diferencia de goles es distinta
            //devuelve +1 o -1 según quien tenga más goles
            return (a.stats.goals-a.stats.againstGoals) > (b.stats.goals-b.stats.againstGoals) ? 1 : -1;
          })
          roundRankings.push(roundRanking)
        }
        return roundRankings
      }
      else {
        return []
      }
    },
    teamMatchesPerRound: state => (id) => {      
      if (state.competition.teams && state.rounds && state.rounds.length != 0){
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
      }
      else {
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
