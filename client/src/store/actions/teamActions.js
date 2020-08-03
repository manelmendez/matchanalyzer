import * as types from '../mutations/mutation-types'
import axios from 'axios'

// TEAM
export const addTeam = ({ commit }, body) => {
  console.log('ACTION -- addTeam')
  return axios
    .post('addTeam', body)
    .then((response) => {
      commit(types.ADD_MYTEAM, response.data.team)
      return response
    })
    .catch((err) => {
      throw err.response
    })
}
export const getTeam = ({ commit }, id) => {
  console.log('ACTION -- getTeam')
  return axios.get('getTeam/' + id).then((response) => {
    commit(types.GET_TEAM, response.data.team)
    return response.data.team
  })
}
export const getUserTeams = ({ commit }, userId) => {
  console.log('ACTION -- getUserTeams')
  return axios.get('getUserTeams/' + userId).then((response) => {
    commit(types.GET_MYTEAMS, response.data.teams)
  })
}
export const addNoManagerTeam = ({ commit }, body) => {
  console.log('ACTION -- addNoManagerTeam')
  return axios
    .post('addNoManagerTeam', body)
    .then((response) => {
      // ESTA USANDO UNA MUTATION DE COMPETITION DESDE TEAM por eso el root:true
      commit(
        'competition/' + types.ADD_TEAM_TO_COMPETITION,
        response.data.team,
        { root: true }
      )
      return response
    })
    .catch((err) => {
      throw err.response
    })
}
export const uploadTeamImage = ({ commit }, formData) => {
  console.log('ACTION -- uploadTeamImage')
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  return axios
    .post('uploadImage', formData, {
      headers: headers,
      onUploadProgress: (progressEvent) => {
        console.log(
          'Progress: ' +
            Math.round((progressEvent.loaded / progressEvent.total) * 100) +
            '%'
        )
      }
    })
    .then((response) => {
      commit(types.UPLOAD_IMAGE)
      return response
    })
    .catch((err) => {
      throw err.response
    })
}
export const updateTeam = ({ commit }, data) => {
  console.log('ACTION -- updateTeam')
  return axios
    .put('updateTeam/' + data.id, data.body)
    .then((response) => {
      commit(types.UPDATE_TEAM)
      commit(
        'competition/' + types.ADD_TEAM_TO_COMPETITION,
        response.data.team,
        { root: true }
      )
      return response
    })
    .catch((err) => {
      throw err.response
    })
}
export const deleteTeam = ({ commit }, id) => {
  console.log('ACTION -- deleteTeam')
  return axios
    .delete('deleteTeam/' + id)
    .then((response) => {
      commit(types.DELETE_TEAM, id)
      return response
    })
    .catch((err) => {
      throw err.response
    })
}

// PLAYER
export const addPlayer = ({ commit }, body) => {
  console.log('ACTION -- addPlayer')
  return axios
    .post('addPlayer', body)
    .then((response) => {
      commit(types.ADD_PLAYER, response.data.player)
      return response
    })
    .catch((err) => {
      throw err.response
    })
}
export const getPlayersByTeamId = ({ commit }, teamId) => {
  console.log('ACTION -- getPlayersByTeamId')
  return axios
    .get('getPlayersByTeamId/' + teamId)
    .then((response) => {
      commit(types.GET_PLAYERS_BY_TEAMID, response.data.players)
    })
    .catch((err) => {
      throw err.response
    })
}
export const updatePlayer = ({ commit }, body) => {
  console.log('ACTION -- updatePlayer')
  return axios
    .put('updatePlayer/' + body.id, body)
    .then((response) => {
      commit(types.UPDATE_PLAYER, response.data.player)
      return response
    })
    .catch((err) => {
      throw err.response
    })
}
export const deletePlayer = ({ commit }, id) => {
  console.log('ACTION -- deletePlayer')
  return axios
    .delete('deletePlayer/' + id)
    .then((response) => {
      commit(types.DELETE_PLAYER, id)
      return response
    })
    .catch((err) => {
      throw err.response
    })
}
