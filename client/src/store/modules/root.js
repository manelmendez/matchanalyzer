import { rootMutations } from '../mutations/rootMutations'

export const rootModule = {
  namespaced: true,
  state: {
    snackbar: {
      show: false,
      color: '',
      text: '',
    },
  },
  getters: {
    snackbar: (state) => {
      return state.snackbar
    },
  },
  mutations: {
    ...rootMutations,
  },
  actions: {},
}
