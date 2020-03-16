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
    state.selectedRound = rounds.length
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

  [types.PREVIOUS_ROUND] (state) {
    state.selectedRound -= 1
  },

  [types.NEXT_ROUND] (state) {
    state.selectedRound += 1
  },

  [types.UPDATE_MATCH] (state, data) {    
    let updatedMatch = data    
    let round = 0
    let match = 0
    for (var i = 0; i < state.rounds.length; i++) {
      if (state.rounds[i].id == updatedMatch.round) {  
        round = i              
        for (let j = 0; j < state.rounds[i].matches.length; j++) {
          if (state.rounds[i].matches[j].id == updatedMatch.id) {
            // EN PRINCIPIO EL INDEXOF() ES LO MISMO QUE LA J
            let index = state.rounds[i].matches.indexOf(state.rounds[i].matches[j])   
            match = index                                  
            state.rounds[i].matches[index] = updatedMatch            
          }
        }
      }
    }    
  },

  [types.ADD_TEAM_TO_COMPETITION] (state, team) {
    state.competition.teams = [...state.competition.teams, team]
  },

  [types.DELETE_MATCH] (state, id) {    
    //eliminar partido de la jornada
    for (let x = 0; x < state.rounds[state.selectedRound - 1].matches.length; x++) {
      if(state.rounds[state.selectedRound - 1].matches[x].id == id){
        state.rounds[state.selectedRound - 1].matches.splice(x,1)
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

  [types.ADD_MATCHPART] (state, data) {      
    console.log(data);
  },

  [types.ADD_MINUTE] (state, data) {      
    console.log(data);
  },

  [types.ADD_GOAL] (state, data) {      
    console.log(data);
  },

  [types.ADD_ASSIST] (state, data) {      
    console.log(data);
  },

  [types.ADD_CARD] (state, data) {      
    console.log(data);
  },

  [types.ADD_SUBSTITUTION] (state, data) {      
    console.log(data);
  },

  [types.GET_MATCHPARTSBYMATCHID] (state, data) {
    state.matchparts = data.matchparts
    return data
  },

  [types.GET_MINUTESBYMATCHID] (state, data) {
    state.minutes = data.minutes
    return data
  },

  [types.GET_GOALSBYMATCHID] (state, data) {
    state.goals = data.goals
    return data
  },

  [types.GET_ASSISTSBYMATCHID] (state, data) {
    state.assists = data.assists
    return data
  },

  [types.GET_CARDSBYMATCHID] (state, data) {
    state.cards = data.cards
    return data
  },

  [types.GET_SUBSTITUTIONSBYMATCHID] (state, data) {
    state.substitutions = data.substitutions
    return data
  },

  [types.DELETE_MATCHPART] (state, matchpartId) {
    let index = state.matchparts.findIndex(item => item.id == matchpartId)
    state.matchparts.splice(index, 1)
  },

  [types.DELETE_MINUTE] (state, minuteId) {
    let index = state.minutes.findIndex(item => item.id == minuteId)
    state.minutes.splice(index, 1)
  },

  [types.DELETE_GOAL] (state, goalId) {
    let index = state.goals.findIndex(item => item.id == goalId)
    state.goals.splice(index, 1)
  },

  [types.DELETE_ASSIST] (state, assistId) {
    let index = state.assists.findIndex(item => item.id == assistId)
    state.assists.splice(index, 1)
  },

  [types.DELETE_CARD] (state, cardId) {
    let index = state.cards.findIndex(item => item.id == cardId)
    state.cards.splice(index, 1)
  },

  [types.DELETE_SUBSTITUTION] (state, substitutionId) {
    let index = state.substitutions.findIndex(item => item.id == substitutionId)
    state.substitutions.splice(index, 1)
  },
}
