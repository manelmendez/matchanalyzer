import * as types from './mutation-types'

export const rootMutations = {
  [types.SNACKBAR](state, snackbar) {
    state.snackbar = snackbar
    setTimeout(() => {
      let snackoff = {
        color: '',
        text: '',
        show: false
      }
      state.snackbar = snackoff
    }, 4000)
  },
  [types.SNACKBAR_OFF](state) {
    state.snackbar = {
      color: '',
      text: '',
      show: false
    }
  },
  [types.SET_THEME](state, theme) {
    state.theme = theme
  }
}
