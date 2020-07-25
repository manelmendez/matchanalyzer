import * as types from './mutation-types'

export const userMutations = {
  [types.INITIALIZE](state) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if (authUser) {
      state.user = authUser
    }
  },
  [types.SIGN_IN](state, user_payload) {
    state.user = { ...user_payload }
  },

  [types.SIGN_UP](state, user_payload) {
    state.user = { ...user_payload }
  },

  [types.SIGN_OUT](state) {
    state.user = {
      isLogged: false,
    }
  },
}
