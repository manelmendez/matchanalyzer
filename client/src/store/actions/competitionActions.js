import * as types from '../mutations/mutation-types'
import axios from 'axios'

export const addCompetition = ({commit}, body) => {
  console.log("ACTION -- addCompetition")
  return axios.post('addCompetition', body)
    .then(response => {
      commit(types.ADD_COMPETITION, response.data.competition)
      return response
    })
    .catch((err) => {
      return err.response
    })
}

export const getCompetition = ({commit}, id) => {
  console.log("ACTION -- getCompetition")
  return axios.get('getCompetition/'+id)
    .then(response => {            
      commit(types.GET_COMPETITION, response.data.competition)
    })
}

export const getUserCompetitions = ({commit}, id) => {
  console.log("ACTION -- getUserCompetitions")
  return axios.get('getUserCompetitions/'+id)
    .then(response => {
      commit(types.GET_COMPETITIONS, response.data.competitions)
    })
}

export const addRound = ({commit}, body) => {
  console.log("ACTION -- addRound")
  return axios.post('addRound', body).then(response => {
    commit(types.ADD_ROUND, response.data.round)
    return response
  }).catch((err) => {
    return err.response
  })
}

export const addMatch = ({commit}, body) => {
  console.log("ACTION -- addMatch")
  return axios.post('addMatch', body).then(response => {
    commit(types.ADD_MATCH, response.data)
    return response
  }).catch((err) => {
    return err.response
  })
}

export const getCompetitionRounds = ({commit}, id) => {
  console.log("ACTION -- getCompetitionRounds")
  return axios.get('getCompetitionRounds/'+id)
    .then(response => {
      commit(types.GET_COMPETITION_ROUNDS, response.data.rounds)
    })
}

export const getRound = ({commit}, id) => {
  console.log("ACTION -- getRound")
  return axios.get('getRound/'+id)
    .then(response => {
      commit(types.GET_ROUND, response.data.round)
    })
}

export const changeRound = ({commit}, round) => {
  console.log("ACTION -- changeRound")
  return commit(types.CHANGE_ROUND, round)
}

export const previousRound = ({commit}) => {
  console.log("ACTION -- previousRound")
  return commit(types.PREVIOUS_ROUND)
}

export const nextRound = ({commit}) => {
  console.log("ACTION -- nextRound")
  return commit(types.NEXT_ROUND)
}

export const updateMatch = ({commit}, data) => {
  console.log("ACTION -- updateMatch")
  return axios.put('updateMatch/'+data.id, data.body).then(response => {    
    data.body.id = data.id
    commit(types.UPDATE_MATCH, data.body)
    return response
  }).catch((err) => {
    return err.response
  })
}

export const deleteMatch = ({commit}, id) => {
  console.log("ACTION -- deleteMatch")
  return axios.delete('deleteMatch/'+id).then(response => {
    commit(types.DELETE_MATCH, id)
    return response
  }).catch((err) => {
    return err.response
  })
}

export const deleteRound = ({commit}, id) => {
  console.log("ACTION -- deleteRound")
  return axios.delete('deleteRound/'+id).then(response => {    
    commit(types.DELETE_ROUND)
    return response
  }).catch((err) => {    
    return err.response
  })
}

export const updateCompetition = ({commit}, data) => {
  console.log("ACTION -- updateCompetition")
  return axios.put('updateCompetition/'+data.id, data).then(response => {
    commit(types.UPDATE_COMPETITION, response.data)
    return response
  }).catch((err) => {
    return err.response
  })
}

export const deleteCompetition = ({commit}, data) => {
  console.log("ACTION -- deleteCompetition")
  return axios.delete('deleteCompetition/'+data).then(response => {
    commit(types.DELETE_COMPETITION, response.data.id)
    return response
  }).catch((err) => {
    return err.response
  })
}

export const addMatchpart = ({commit}, body) => {
  console.log("ACTION -- addMatchpart")
  return axios.post('addMatchpart', body).then(response => {
    commit(types.ADD_MATCHPART, response.data)
    return response
  }).catch((err) => {
    return err.response
  })
}

export const getMatchpartsByMatchId = ({commit}, id) => {
  console.log("ACTION -- getMatchpartsByMatchId")
  return axios.get('getMatchpartsByMatchId/'+id)
    .then(response => {
      commit(types.GET_MATCHPARTSBYMATCHID, response.data)
      return response.data.matchParts
    })
}

export const addMinute = ({commit}, body) => {
  console.log("ACTION -- addMinute")
  return axios.post('addMinute', body).then(response => {
    commit(types.ADD_MINUTE, response.data)
    return response
  }).catch((err) => {
    return err.response
  })
}

export const addGoal = ({commit}, body) => {
  console.log("ACTION -- addGoal")
  return axios.post('addGoal', body).then(response => {
    commit(types.ADD_GOAL, response.data)
    return response
  }).catch((err) => {
    return err.response
  })
}

export const addAssist = ({commit}, body) => {
  console.log("ACTION -- addAssist")
  return axios.post('addAssist', body).then(response => {
    commit(types.ADD_ASSIST, response.data)
    return response
  }).catch((err) => {
    return err.response
  })
}

export const addCard = ({commit}, body) => {
  console.log("ACTION -- addCard")
  return axios.post('addCard', body).then(response => {
    commit(types.ADD_CARD, response.data)
    return response
  }).catch((err) => {
    return err.response
  })
}

export const addSubstitution = ({commit}, body) => {
  console.log("ACTION -- addSubstitution")
  return axios.post('addSubstitution', body).then(response => {
    commit(types.ADD_SUBSTITUTION, response.data)
    return response
  }).catch((err) => {
    return err.response
  })
}

export const getMinutesByMatchId = ({commit}, id) => {
  console.log("ACTION -- getMinutesByMatchId")
  return axios.get('getMinutesByMatchId/'+id)
    .then(response => {
      commit(types.GET_MINUTESBYMATCHID, response.data)
      return response.data.minutes
    })
}

export const getGoalsByMatchId = ({commit}, id) => {
  console.log("ACTION -- getGoalsByMatchId")
  return axios.get('getGoalsByMatchId/'+id)
    .then(response => {
      commit(types.GET_GOALSBYMATCHID, response.data)
      return response.data.goals
    })
}

export const getAssistsByMatchId = ({commit}, id) => {
  console.log("ACTION -- getAssistsByMatchId")
  return axios.get('getAssistsByMatchId/'+id)
    .then(response => {
      commit(types.GET_ASSISTSBYMATCHID, response.data)
      return response.data.assists
    })
}

export const getCardsByMatchId = ({commit}, id) => {
  console.log("ACTION -- getCardsByMatchId")
  return axios.get('getCardsByMatchId/'+id)
    .then(response => {
      commit(types.GET_CARDSBYMATCHID, response.data)
      return response.data.cards
    })
}

export const getSubstitutionsByMatchId = ({commit}, id) => {
  console.log("ACTION -- getSubstitutionsByMatchId")
  return axios.get('getSubstitutionsByMatchId/'+id)
    .then(response => {
      commit(types.GET_SUBSTITUTIONSBYMATCHID, response.data)
      return response.data.substitutions
    })
}

export const deleteMinute = ({commit}, data) => {
  console.log("ACTION -- deleteMinute")
  return axios.delete('deleteMinute/'+data).then(response => {
    commit(types.DELETE_MINUTE, response.data.id)
    return response
  }).catch((err) => {
    return err.response
  })
}

export const deleteGoal = ({commit}, data) => {
  console.log("ACTION -- deleteGoal")
  return axios.delete('deleteGoal/'+data).then(response => {
    commit(types.DELETE_GOAL, response.data.id)
    return response
  }).catch((err) => {
    return err.response
  })
}

export const deleteAssist = ({commit}, data) => {
  console.log("ACTION -- deleteAssist")
  return axios.delete('deleteAssist/'+data).then(response => {
    commit(types.DELETE_ASSIST, response.data.id)
    return response
  }).catch((err) => {
    return err.response
  })
}

export const deleteCard = ({commit}, data) => {
  console.log("ACTION -- deleteCard")
  return axios.delete('deleteCard/'+data).then(response => {
    commit(types.DELETE_CARD, response.data.id)
    return response
  }).catch((err) => {
    return err.response
  })
}

export const deleteSubstitution = ({commit}, data) => {
  console.log("ACTION -- deleteSubstitution")
  return axios.delete('deleteSubstitution/'+data).then(response => {
    commit(types.DELETE_SUBSTITUTION, response.data.id)
    return response
  }).catch((err) => {
    return err.response
  })
}