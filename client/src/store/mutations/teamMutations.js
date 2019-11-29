import * as types from './mutation-types'

export const teamMutations = {
  [types.ADD_TEAM] (state, team) {
    state.teams = [...state.teams, team]
  },

  [types.GET_TEAM] (state, team) {
    state.team = team
  },

  [types.GET_TEAMS] (state, teams) {
    state.teams = teams
  },

  [types.ADD_MYTEAM] (state, team) {
    state.myTeams = [...state.myTeams, team]
  },

  [types.GET_MYTEAMS] (state, teams) {
    state.myTeams = teams
  },

  [types.UPDATE_TEAM] (state) {

  },

  [types.DELETE_TEAM] (state, teamId) {    
    let index = state.myTeams.findIndex(item => item.id == teamId)
    state.myTeams.splice(index, 1)

    let index2 = state.teams.findIndex(item => item.id == teamId)
    state.teams.splice(index2, 1)
  },

  [types.GET_TEAMPLAYERS] (state, players) {
    state.team.players = players
  },

  [types.ADD_PLAYER] (state, player) {
    state.team.players = [...state.team.players, player]
  },

  [types.UPDATE_PLAYER] (state, player) {
    let previousPlayer = state.team.players.find(a => a.id === player.id)    
    Object.assign(previousPlayer, player)
  },

  [types.DELETE_PLAYER] (state, playerId) {
    let index = state.team.players.findIndex(item => item.id == playerId)
    state.team.players.splice(index, 1)
  },
}
