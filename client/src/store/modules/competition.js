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
  },
  getters: {
    competitions: state => {
      return state.competitions
    },
    competition: state => {
      if (state.competition.rounds) { 
        for (let i = 0; i < state.competition.rounds.length; i++) {
          for (let j = 0; j < state.competition.rounds[i].matches.length; j++) {
            for (let k = 0; k < state.competition.teams.length; k++) {
              if (state.competition.teams[k].id = state.competition.rounds[i].matches.localTeam) {
                state.competition.rounds[i].matches[j].localTeam = state.competition.teams[k]
              }
              if (state.competition.teams[k].id = state.competition.rounds[i].matches.localTeam) {
                state.competition.rounds[i].matches[j].awayTeam = state.competition.teams[k]
              }
            }
          }
        }
      }
      return state.competition
    },
    rounds: state => {
      return state.rounds
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
      }
      else {
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
      if (state.competition.teams && state.competition.rounds && state.competition.rounds.length != 0){
        let teams = [...state.competition.teams]
        // console.log(teams);
        let updatedTeams = []
        let actualCompetition = {...state.competition}
        // sumar todas las jornadas hasta la seleccionada
        for (let i = 0; i < teams.length; i++) {
          let updatedTeam = {...teams[i]}
          let teamStats = {}
          let actualRound = (state.selectedRound!=null||state.selectedRound -1 > teams[i].stats.length) ? state.selectedRound-1 : teams[i].stats.length -1
          for (let j = 0; j < actualRound+1; j++) {
            if(j==0){
              teamStats = {...teams[i].stats[j]}
            }
            else{
              if (teams[i].stats[j]!=undefined) {
                teamStats.gamesPlayed+=teams[i].stats[j].gamesPlayed
                teamStats.homeGamesPlayed+= teams[i].stats[j].homeGamesPlayed
                teamStats.awayGamesPlayed+= teams[i].stats[j].awayGamesPlayed
                teamStats.points+= teams[i].stats[j].points
                teamStats.homePoints += teams[i].stats[j].homePoints
                teamStats.awayPoints+= teams[i].stats[j].awayPoints
                teamStats.wins+= teams[i].stats[j].wins
                teamStats.homeWins+= teams[i].stats[j].homeWins
                teamStats.awayWins+= teams[i].stats[j].awayWins
                teamStats.draws+= teams[i].stats[j].draws
                teamStats.homeDraws+= teams[i].stats[j].homeDraws
                teamStats.awayDraws+= teams[i].stats[j].awayDraws
                teamStats.loses+= teams[i].stats[j].loses
                teamStats.homeLoses+= teams[i].stats[j].homeLoses
                teamStats.awayLoses+= teams[i].stats[j].awayLoses
                teamStats.goals+= teams[i].stats[j].goals
                teamStats.homeGoals+= teams[i].stats[j].homeGoals
                teamStats.awayGoals+= teams[i].stats[j].awayGoals
                teamStats.againstGoals+= teams[i].stats[j].againstGoals
                teamStats.homeAgainstGoals+= teams[i].stats[j].homeAgainstGoals
                teamStats.awayAgainstGoals+= teams[i].stats[j].awayAgainstGoals
              }
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
            for (let x = 0; x < actualCompetition.rounds.length; x++) {
              matches=[...matches,...actualCompetition.rounds[x].matches]
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
    }
  },
  mutations: {
    ...competitionMutations
  },
  actions: {
    ...competitionActions
  }
}
