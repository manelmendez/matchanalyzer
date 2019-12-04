import * as types from '../mutations/mutation-types'
import axios from 'axios'

export const addCompetition = ({commit}, body) => {
  console.log("ACTION -- addCompetition")
  return axios.post('addCompetition', body)
    .then(response => {
      if(response.status === 200) {
        commit(types.ADD_COMPETITION, response.data.competition)
      }
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
      console.log(response);
       
      let competition = response.data.competition      
      commit(types.GET_COMPETITION, competition)
    })
}

export const getUserCompetitions = ({commit}, id) => {
  console.log("ACTION -- getUserCompetitions")
  return axios.get('getUserCompetitions/'+id)
    .then(response => {
      let competitions = response.data.competitions
      commit(types.GET_COMPETITIONS, competitions)
    })
}

export const addRound = ({commit}, body) => {
  console.log("ACTION -- addRound")
  return axios.post('addRound', body).then(response => {
    if(response.status === 200) {
      commit(types.ADD_ROUND, response.data.round)
    }
    return response
  }).catch((err) => {
    return err.response
  })
}

export const addMatch = ({commit}, body) => {
  console.log("ACTION -- addMatch")
  return axios.post('addMatch', body).then(response => {
    if(response.status === 200) {
      commit(types.ADD_MATCH, response.data)
    }
    return response
  }).catch((err) => {
    return err.response
  })
}

export const getCompetitionRounds = ({commit}, id) => {
  console.log("ACTION -- getCompetitionRounds")
  return axios.get('getCompetitionRounds/'+id)
    .then(response => {
      let rounds = response.data.rounds
      commit(types.GET_COMPETITION_ROUNDS, rounds)
    })
}

export const getRound = ({commit}, id) => {
  console.log("ACTION -- getRound")
  return axios.get('getRound/'+id)
    .then(response => {
      let competitions = response.data.competitions
      commit(types.GET_ROUND, round)
    })
}

export const changeRound = ({commit}, round) => {
  console.log("ACTION -- changeRound")
  return commit(types.CHANGE_ROUND, round)
}

export const updateMatch = ({commit}, data) => {
  console.log("ACTION -- updateMatch")
  return axios.put('updateMatch/'+data.id, data.body).then(response => {
    if(response.status === 200) {
      commit(types.UPDATE_MATCH, response.data)
    }
    return response
  }).catch((err) => {
    return err.response
  })
}

export const deleteMatch = ({commit}, data) => {
  console.log("ACTION -- deleteMatch")
  return axios.delete('deleteMatch/'+data.id, { data: data.body }).then(response => {
    if(response.status === 200) {
      commit(types.DELETE_MATCH, data)
    }
    return response
  }).catch((err) => {
    return err.response
  })
}

export const deleteRound = ({commit}, id) => {
  console.log("ACTION -- deleteRound")
  return axios.delete('deleteRound/'+id).then(response => {    
    if(response.status === 200) {
      commit(types.DELETE_ROUND)
    }
    return response
  }).catch((err) => {    
    return err.response
  })
}

export const updateCompetition = ({commit}, data) => {
  console.log("ACTION -- updateCompetition")
  return axios.put('updateCompetition/'+data.id, data).then(response => {
    if(response.status === 200) {
      commit(types.UPDATE_COMPETITION, response.data)
    }
    return response
  }).catch((err) => {
    return err.response
  })
}

export const deleteCompetition = ({commit}, data) => {
  console.log("ACTION -- deleteCompetition")
  console.log(data);
  return axios.delete('deleteCompetition/'+data).then(response => {
    if(response.status === 200) {
      commit(types.DELETE_COMPETITION, response.data.id)
    }
    return response
  }).catch((err) => {
    return err.response
  })
}