import * as types from '../mutations/mutation-types'
import axios from 'axios'

export const addTeam = ({commit}, body) => {
  console.log("ACTION -- addTeam")
  console.log(body);
  
  return axios.post('addTeam', body)
    .then(response => {
      if(response.status === 200) {
        commit(types.ADD_MYTEAM, response.data.team)
      }
      return response
    })
    .catch((err) => {
      throw err.response
    })
}
export const getTeam = ({commit}, id) => {
  console.log("ACTION -- getTeam")
  return axios.get('getTeam/'+id)
    .then(response => {
      let team = response.data.team
      commit(types.GET_TEAM, team)
    })
}
export const getAllTeams = ({commit}) => {
  console.log("ACTION -- getAllTeams")
  return axios.get('getAllTeams')
    .then(response => {
      let teams = response.data.teams
      commit(types.GET_TEAMS, teams)
    })
}

export const getUserTeams = ({commit}, userId) => {
  console.log("ACTION -- getUserTeams")
  return axios.get('getUserTeams/'+userId)
    .then(response => {
      let teams = response.data.teams
      commit(types.GET_MYTEAMS, teams)
    })
}

export const addNoManagerTeam = ({commit}, body) => {
  console.log("ACTION -- addNoManagerTeam")
  return axios.post('addNoManagerTeam', body)
    .then(response => {
      if(response.status === 200) {
        // ESTA USANDO UNA MUTATION DE COMPETITION DESDE TEAM por eso el root:true        
        commit('competition/'+types.ADD_TEAM_TO_COMPETITION, response.data.team, { root: true })
      }      
      return response
    })
    .catch((err) => {
      throw err.response
    })
}

export const uploadTeamImage = ({commit}, formData) => {
  console.log("ACTION -- uploadTeamImage")
  return axios.post('uploadImage', formData,{
    onUploadProgress: progressEvent => {
      console.log("Progress: "+Math.round(progressEvent.loaded / progressEvent.total*100)+ '%')
    }
  })
  .then(response => {
    return response
  })
  .catch((err) => {
    throw err.response
  })
}

export const updateTeam = ({commit}, data) => {
  console.log("ACTION -- updateTeam")
  return axios.put('updateTeam/'+data.id, data.body)
  .then(response => {
    console.log(response)
    if(response.status === 200) {
      commit(types.UPDATE_TEAM)
    }
    return response
  }).catch((err) => {
    console.log(err);
    
    throw err.response
  })
}
export const deleteTeam = ({commit}, id) => {
  console.log("ACTION -- deleteTeam")  
  return axios.delete('deleteTeam/'+id)
  .then(response => {
    if(response.status === 200) {
      commit(types.DELETE_TEAM, id)
    }
    return response
  })
  .catch((err) => {
    throw err.response
  })
}
export const addPlayer = ({commit}, body) => {
  console.log("ACTION -- addPlayer")
  return axios.post('addPlayer', body)
    .then(response => {
      if(response.status === 200) {        
        commit(types.ADD_PLAYER, response.data.player)
      }
      return response
    })
    .catch((err) => {
      throw err.response
    })
}
export const getPlayerByTeamId = ({commit}, id) => {
  console.log("ACTION -- getPlayerByTeamId")
  return axios.get('getPlayerByTeamId/'+id)
    .then(response => {
      let players = response.data
      commit(types.GET_TEAMPLAYERS, players)
    })
}
export const updatePlayer = ({commit}, body) => {
  console.log("ACTION -- updatePlayer")  
  return axios.put('updatePlayer/'+body.id, body)
  .then(response => {    
    commit(types.UPDATE_PLAYER, response.data.player)
    return response
  })
  .catch((err) => {
    throw err.response
  })
}
export const deletePlayer = ({commit}, id) => {
  console.log("ACTION -- deletePlayer")  
  return axios.delete('deletePlayer/'+id)
  .then(response => {
    if(response.status === 200) {
      commit(types.DELETE_PLAYER, id)
    }
    return response
  })
  .catch((err) => {
    throw err.response
  })
}