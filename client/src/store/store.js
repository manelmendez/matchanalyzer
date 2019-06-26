import Vue from 'vue'
import Vuex from 'vuex'

import { rootMutations } from './mutations/rootMutations'
import { userMutations } from './mutations/userMutations'
import { teamMutations } from './mutations/teamMutations'
import { playerMutations } from './mutations/playerMutations'
import { competitionMutations } from './mutations/competitionMutations'

import * as rootActions from './actions/rootActions'
import * as userActions from './actions/userActions'
import * as teamActions from './actions/teamActions'
import * as playerActions from './actions/playerActions'
import * as competitionActions from './actions/competitionActions'

Vue.use(Vuex)

const state = {
  user: {},
  team: {},
  teams: [],
  myTeams: [],
  competitions: [],
  competition: {},
  selectedRound: null,
  snackbar: {
    show: false,
    color: "",
    text: ""
  }
}

const getters = {
  user: state => {
    return state.user
  },
  team: state => {
    return state.team
  },
  isLogged: state => {
    return state.user.isLogged
  },
  teams: state => {
    return state.teams
  },
  myTeams: state => {
    return state.myTeams
  },
  teamPlayers: state => {
    return state.team.players
  },
  competitions: state => {
    return state.competitions
  },
  competition: state => {
    return state.competition
  },
  rounds: state => {
    return state.competition.rounds
  },
  snackbar: state => {
    return state.snackbar
  },
  selectedRound: state => {
    if (state.selectedRound==null) {
      if (state.competition.rounds) {
        return state.competition.rounds.length
      }
    }
    else{
      return state.selectedRound
    }
  },
  matches: state => {
    if (state.competition.rounds) {
      return state.competition.rounds[state.selectedRound!=null ? state.selectedRound -1 : state.competition.rounds.length -1].matches
    }
  },
  roundTeams: state => {
    if (state.competition.rounds){
      let actualCompetition = {...state.competition}
      let actualRound = {...actualCompetition.rounds[state.selectedRound!=null ? state.selectedRound -1 : actualCompetition.rounds.length -1]}
      let actualRoundTeams = [...actualCompetition.teams]
      for (var i = 0; i < actualCompetition.teams.length; i++) {
        let found = false
        let j = 0
        while (j < actualRound.matches.length && !found) {
          if(actualCompetition.teams[i]._id == actualRound.matches[j].localTeam._id || actualCompetition.teams[i]._id == actualRound.matches[j].awayTeam._id){
            found = true
            var index = actualRoundTeams.map(x => {
              return x._id;
            }).indexOf(actualCompetition.teams[i]._id);
            actualRoundTeams.splice(index, 1);
          }
          j++
        }
      }
      return actualRoundTeams
    }
  },
  rankedTeams: state => {
    if (state.competition.teams && state.competition.rounds){
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
              if ((matches[y].localTeam._id===a._id && matches[y].awayTeam._id===b._id) || (matches[y].localTeam._id===b._id && matches[y].awayTeam._id===a._id)) {
                duelMatches.push(matches[y])
              }
            }
            //buscar diferencia de victorias/empates/derrotas
            let aWin=0
            let aDraw=0
            let aLose=0
            let goalDifference=0
            for (let z = 0; z < duelMatches.length; z++) {
              if(duelMatches[z].localTeam._id==a._id && Number(duelMatches[z].localTeamGoals)>Number(duelMatches[z].awayTeamGoals)){
                aWin++
                goalDifference+=Number(duelMatches[z].localTeamGoals)-Number(duelMatches[z].awayTeamGoals)
              }
              else if(duelMatches[z].awayTeam._id==a._id && Number(duelMatches[z].awayTeamGoals)>Number(duelMatches[z].localTeamGoals)){
                aWin++
                goalDifference+=Number(duelMatches[z].awayTeamGoals)-Number(duelMatches[z].localTeamGoals)
              }
              else if(duelMatches[z].localTeam._id==a._id && Number(duelMatches[z].localTeamGoals)==Number(duelMatches[z].awayTeamGoals)){
                aDraw++
              }
              else if(duelMatches[z].awayTeam._id==a._id && Number(duelMatches[z].awayTeamGoals)==Number(duelMatches[z].localTeamGoals)){
                aDraw++
              }
              else if(duelMatches[z].localTeam._id==a._id && Number(duelMatches[z].localTeamGoals)<Number(duelMatches[z].awayTeamGoals)){
                aLose++
                goalDifference+=Number(duelMatches[z].localTeamGoals)-Number(duelMatches[z].awayTeamGoals)
              }
              else if(duelMatches[z].awayTeam._id==a._id && Number(duelMatches[z].awayTeamGoals)<Number(duelMatches[z].localTeamGoals)){
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
}

const actions = {
  ...rootActions,
  ...userActions,
  ...teamActions,
  ...playerActions,
  ...competitionActions,
}

const mutations = {
  ...rootMutations,
  ...userMutations,
  ...teamMutations,
  ...playerMutations,
  ...competitionMutations
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
