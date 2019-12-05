import * as types from '../mutations/mutation-types'
import axios from 'axios'

export const initializeStore = ({commit}) => {
  console.log("ACTION -- initializeStore")
  commit(types.INITIALIZE)
}
export const signIn = ({commit}, body) => {
  console.log("ACTION -- signIn")
  return axios.post('signIn', body)
    .then(response => {      
      let authUser = {
        token: response.data.token,
        isLogged: true,
        ...response.data.user
      }
      axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token
      window.localStorage.setItem('authUser', JSON.stringify(authUser))
      commit(types.SIGN_IN, authUser)
      return response
    })
}
export const signInGoogle = ({commit}, googleUser) => {
  console.log("ACTION -- signInGoogle")
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
      let authUser = {
        token: response.data.token,
        isLogged: true,
        ...response.data.user
      }
      axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token
      window.localStorage.setItem('authUser', JSON.stringify(authUser))
      commit(types.SIGN_IN, authUser)
      return response
    })
}
export const signInFB = ({commit}, token_payload) => {
  console.log("ACTION -- signInFB")
  return axios.post('signin', body)
    .then(response => {
      let authUser = {
        token: response.data.token,
        isLogged: true,
        ...response.data.user
      }
      axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token
      window.localStorage.setItem('authUser', JSON.stringify(authUser))
      commit(types.SIGN_IN, authUser)
      return response
    })
}

export const signUp = ({commit}, body) => {
  console.log("ACTION -- signUp")
  return axios.post('signup', body)
    .then(response => {
      let authUser = {
        token: response.data.token,
        isLogged: true,
        ...response.data.user
      }
      axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token
      window.localStorage.setItem('authUser', JSON.stringify(authUser))
      commit(types.SIGN_UP, authUser)
      return response
    })
}
export const signOut = ({commit}) => {
  console.log("ACTION -- signOut")
  axios.defaults.headers.common['Authorization'] = null
  window.localStorage.removeItem('authUser')
  commit(types.SIGN_OUT)
}
