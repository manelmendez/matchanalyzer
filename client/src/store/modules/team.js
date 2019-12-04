import { teamMutations } from '../mutations/teamMutations'
import * as teamActions from '../actions/teamActions'

export const teamModule = {
  namespaced: true,
  state: {
    team: {players:[]},
    teams: [],
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
  },
  mutations: {
    ...teamMutations
  },
  actions: {
    ...teamActions
  }
}
