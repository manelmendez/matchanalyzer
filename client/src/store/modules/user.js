import { userMutations } from '../mutations/userMutations';
import * as userActions from '../actions/userActions';

export const userModule = {
  namespaced: true,
  state: {
    user: {}
  },
  getters: {
    user: state => {
      return state.user;
    },
    isLogged: state => {
      return state.user.isLogged;
    },
  },
  mutations: {
    ...userMutations
  },
  actions: {
    ...userActions
  }
};
