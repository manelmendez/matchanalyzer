import { teamMutations } from '../mutations/teamMutations'
import * as teamActions from '../actions/teamActions'

export const teamModule = {
  namespaced: true,
  state: {
    teams: [],
    myTeams: [],
    players: [],
    pichichiList: [],
    cardList: []
  },
  getters: {
    teams: (state) => {
      return state.teams
    },
    myTeams: (state) => {
      return state.myTeams
    },
    teamPlayers: (state) => (id) => {
      let team = state.teams.find((team) => team.id == id)
      return team.players
    },
    teamById: (state) => (id) => {
      return state.teams.find((team) => team.id == id)
    },
    myTeamById: (state) => (id) => {
      return state.myTeams.find((team) => team.id == id)
    },
    playersByTeamId: (state) => (teamId) => {
      let playersByTeamId = state.players.filter((player) => player.teamId == teamId)
      for (const player of playersByTeamId) {
        player.name = player.firstname + ' ' + player.lastname
      }
      return playersByTeamId
    },
    pichichiList: (state) => {
      return state.pichichiList
    },
    cardList: (state) => {
      return state.cardList
    }
  },
  mutations: {
    ...teamMutations
  },
  actions: {
    ...teamActions
  }
}
