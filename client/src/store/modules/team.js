import { teamMutations } from '../mutations/teamMutations'
import * as teamActions from '../actions/teamActions'

export const teamModule = {
  namespaced: true,
  state: {
    team: {players:[]},
    teams: [], // NO SE SI SE ESTA USANDO
    myTeams: [],
  },
  getters: {
    team: state => {
      return state.team
    },   
    teams: state => {
      return state.teams
    },
    myTeams: state => {
      return state.myTeams
    },
    teamPlayers: state => {
      return state.team.players
    },
    getTeamNameById: (state) => (id) => { //ejemplo de getter con parametro
      for (let i = 0; i < state.myTeams.length; i++) {
        if (state.teams[i].id == id) {
          return state.teams[i].name
        }
      }
    }
  },
  mutations: {
    ...teamMutations
  },
  actions: {
    ...teamActions
  }
}
