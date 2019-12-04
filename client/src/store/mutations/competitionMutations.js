import * as types from './mutation-types'

export const competitionMutations = {
  [types.ADD_COMPETITION] (state, competition) {
    state.competitions = [...state.competitions, competition]
  },

  [types.GET_COMPETITION] (state, competition) {
    state.competition = competition
  },

  [types.GET_COMPETITION_ROUNDS] (state, rounds) {
    state.rounds = rounds
  },

  [types.GET_COMPETITIONS] (state, competitions) {
    state.competitions = competitions
  },

  [types.ADD_ROUND] (state, round) {
    state.rounds = [...state.rounds, round]
    state.selectedRound = Number(state.rounds.length)
  },

  [types.ADD_MATCH] (state, data) {      
    for (let j = 0; j < state.competition.teams.length; j++) {
      if (data.match.localTeam == state.competition.teams[j].id) {
        data.match.localTeam=state.competition.teams[j]
      }
      else if (data.match.awayTeam == state.competition.teams[j].id) {
        data.match.awayTeam=state.competition.teams[j]
      }
    }    
    for (var i = 0; i < state.rounds.length; i++) {      
      if (state.rounds[i].id == data.match.round) {
        state.rounds[i].matches = [...state.rounds[i].matches, data.match]
      }
    }
  },

  [types.CHANGE_ROUND] (state, round) {
    state.selectedRound = Number(round)
  },

  [types.UPDATE_MATCH] (state, data) {
    // let updatedMatch = data.match
    // let updatedLocalStats = data.localTeamStats
    // let updatedAwayStats = data.awayTeamStats
    // console.log(updatedMatch);
    // let round = null
    // let match = null
    // for (let a = 0; a < data.match.localTeam.stats.length; a++) {
    //   if (data.match.localTeam.stats[a].id == updatedLocalStats.id) {
    //     data.match.localTeam.stats[a] = updatedLocalStats
    //   }
    // }
    // for (let b = 0; b < data.match.awayTeam.stats.length; b++) {
    //   if (data.match.awayTeam.stats[b].id == updatedAwayStats.id) {
    //     data.match.awayTeam.stats[b] = updatedAwayStats
    //   }
    // }
    // for (var i = 0; i < state.competition.rounds.length; i++) {
    //   if (state.competition.rounds[i].id == updatedMatch.round) {  
    //     round = i      
    //     for (let j = 0; j < state.competition.rounds[i].matches.length; j++) {
    //       if (state.competition.rounds[i].matches[j].id == updatedMatch.id) {
    //         // EN PRINCIPIO EL INDEXOF() ES LO MISMO QUE LA J
    //         let index = state.competition.rounds[i].matches.indexOf(state.competition.rounds[i].matches[j])   
    //         match = index         
    //         state.competition.rounds[i].matches[index] = updatedMatch            
    //       }
    //     }
    //   }
    // }    
    // for (let x = 0; x < state.competition.teams.length; x++) {  
    //   if (state.competition.teams[x].id == state.competition.rounds[round].matches[match].localTeam.id) {
    //     for (let y = 0; y < state.competition.teams[x].stats.length; y++) {

    //       if (state.competition.teams[x].stats[y].id == updatedLocalStats.id) {
    //         state.competition.teams[x].stats[y] = updatedLocalStats
    //       }
    //     }
    //   }     
    //   else if (state.competition.teams[x].id == state.competition.rounds[round].matches[match].awayTeam.id) {
    //     for (let z = 0; z < state.competition.teams[x].stats.length; z++) {  
    //       if (state.competition.teams[x].stats[z].id == updatedAwayStats.id) {
    //         state.competition.teams[x].stats[z] = updatedAwayStats
    //       }
    //     }
    //   } 
    // }
  },

  [types.ADD_TEAM_TO_COMPETITION] (state, team) {
    state.competition.teams = [...state.competition.teams, team]
  },

  [types.DELETE_MATCH] (state, data) {    
    //eliminar partido de la jornada
    for (let i = 0; i < state.competition.rounds.length; i++) {
      if (state.competition.rounds[i].id == data.body.roundId) {
        for (let x = 0; x < state.competition.rounds[i].matches.length; x++) {
          if(state.competition.rounds[i].matches[x].id == data.id){
            state.competition.rounds[i].matches.splice(x,1)
          }
        }
      }
    }
    //eliminar stats de ambos equipos
    for (let x = 0; x < state.competition.teams.length; x++) {  
      if (state.competition.teams[x].id == data.body.localTeamId) {
        for (let y = 0; y < state.competition.teams[x].stats.length; y++) {
          if (state.competition.teams[x].stats[y].id == data.body.localTeamStatsId) {
            state.competition.teams[x].stats.splice(y,1)
          }
        }
      }     
      else if (state.competition.teams[x].id == data.body.awayTeamId) {
        for (let z = 0; z < state.competition.teams[x].stats.length; z++) {  
          if (state.competition.teams[x].stats[z].id == data.body.awayTeamStatsId) {
            state.competition.teams[x].stats.splice(z,1)
          }
        }
      } 
    }    
  },

  [types.DELETE_ROUND] (state) {
    state.rounds.pop()
    state.selectedRound = Number(state.rounds.length)
  },

  [types.UPDATE_COMPETITION] (state, competition) {
    let previousCompetition = state.competitions.find(a => a.id === competition.id)    
    Object.assign(previousCompetition, competition)
  },
  [types.DELETE_COMPETITION] (state, competitionId) {
    let index = state.competitions.findIndex(item => item.id == competitionId)
    state.competitions.splice(index, 1)
  },
}
