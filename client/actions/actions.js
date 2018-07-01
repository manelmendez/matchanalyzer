import * as types from '../mutations/mutation-types'
import axios from 'axios'
import Vue from 'vue'
import moment from 'moment'

import constants from '../assets/constants/constants'
import store from '../store/store'

// SETTING UP AXIOS IN VUEX
axios.create()
axios.defaults.baseURL = constants.LOCAL_ADDRESS
// add token to Auth header if onceLogged
if (JSON.parse(window.localStorage.getItem('authUser'))!= null)
{
  axios.defaults.headers.common['Authorization'] = 'Bearer '+JSON.parse(window.localStorage.getItem('authUser')).token
}

export const initializeStore = ({commit}) => {
  commit(types.INITIALIZE)
}

/*
*
*
*     USER
*
*
*/
export const signIn = ({commit}, body) => {
  return axios.post('signin', body)
    .then(response => {
      if(response.status === 200) {
        let authUser = {
          token: response.data.token,
          isLogged: true
        }
        axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token
        window.localStorage.setItem('authUser', JSON.stringify(authUser))
        commit(types.SIGN_IN, authUser)
      }
      return response
    })
    .catch((err) => {
      return err.response
    })
}
export const signInGoogle = ({commit}, googleUser) => {
  const authUser = {}
  // `googleUser` is the GoogleUser object that represents the just-signed-in user.
  // See https://developers.google.com/identity/sign-in/web/reference#users
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  let headers = {
    'Authorization': 'Bearer '+id_token
  }
  return axios.get('oauth/google',{headers})
    .then(response => {
      if(response.status === 200) {
        let authUser = {
          token: response.data.token,
          isLogged: true
        }
        axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token
        window.localStorage.setItem('authUser', JSON.stringify(authUser))
        commit(types.SIGN_IN, authUser)
      }
      return response
    })
    .catch((err) => {
      return err.response
    })
}
export const signInFB = ({commit}, token_payload) => {
  return axios.post('signin', body)
    .then(response => {
      if(response.status === 200) {
        let authUser = {
          token: response.data.token,
          isLogged: true
        }
        axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token
        window.localStorage.setItem('authUser', JSON.stringify(authUser))
        commit(types.SIGN_IN, authUser)
      }
      return response
    })
    .catch((err) => {
      return err.response
    })
}

export const signOut = ({commit}) => {
  axios.defaults.headers.common['Authorization'] = null
  commit(types.SIGN_OUT)
}
/*
*
*
*     TEAMS
*
*
*/
export const addTeam = ({commit}, body) => {
  return axios.post('addTeam', body)
    .then(response => {
      if(response.status === 200) {
        commit(types.ADD_TEAM)
      }
      return response
    })
    .catch((err) => {
      return err.response
    })
}
export const getTeam = ({commit}) => {
  axios.get('getTeam/')
    .then(response => {
      let team = response.data.team
      commit(types.GET_TEAM, team)
    })
}
export const getAllTeams = ({commit}) => {
  axios.get('getAllTeams')
    .then(response => {
      let teams = response.data.teams
      commit(types.GET_TEAMS, teams)
    })
}
/*
*
*
*     PLAYERS
*
*
*/
