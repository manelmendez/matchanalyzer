import { teamMutations } from '../mutations/teamMutations'
import * as teamActions from '../actions/teamActions'

export const teamModule = {
  namespaced: true,
  state: {
    teams: [],
    myTeams: [],
    players: [],
    pichichiList: []
  },
  getters: {
    teams: (state) => {
      return state.teams
    },
    myTeams: (state) => {
      return state.myTeams
    },
    teamPlayers: (state) => {
      return state.team.players
    },
    teamById: (state) => (id) => {
      return state.teams.find((team) => team.id == id)
    },
    myTeamById: (state) => (id) => {
      return state.myTeams.find((team) => team.id == id)
    },
    playersByTeamId: (state) => (teamId) => {
      return state.players.filter((player) => player.team == teamId)
    },
    pichichiList: (state) => {
      return state.pichichiList
    }
  },
  mutations: {
    ...teamMutations
  },
  actions: {
    ...teamActions
  }
}
