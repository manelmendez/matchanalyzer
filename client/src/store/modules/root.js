import { rootMutations } from '../mutations/rootMutations'

export const rootModule = {
  namespaced: true,
  state: {
    snackbar: {
      show: false,
      color: '',
      text: ''
    },
    theme: window.localStorage.getItem('theme')
  },
  getters: {
    snackbar: (state) => {
      return state.snackbar
    },
    theme: (state) => {
      return state.theme
    }
  },
  mutations: {
    ...rootMutations
  },
  actions: {}
}
