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
    commit(types.UPDATE_MATCH, response.data)
    return response
  }).catch((err) => {
    return err.response
  })
}

export const deleteMatch = ({commit}, data) => {
  console.log("ACTION -- deleteMatch")
  return axios.delete('deleteMatch/'+data.id, { data: data.body }).then(response => {
    commit(types.DELETE_MATCH, data)
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