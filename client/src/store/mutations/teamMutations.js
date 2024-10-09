import * as types from './mutation-types'

export const teamMutations = {
  [types.ADD_TEAM](state, team) {
    state.teams = [...state.teams, team]
  },
  [types.GET_TEAM](state, team) {
    if (!state.teams.find((t) => t.id == team.id)) {
      state.teams = [...state.teams, team]
    }
  },
  [types.GET_MYTEAMS](state, teams) {
    state.myTeams = teams
  },
  [types.ADD_MYTEAM](state, team) {
    state.myTeams = [...state.myTeams, team]
  },
  [types.UPDATE_TEAM]() {},
  [types.DELETE_TEAM](state, teamId) {
    let index = state.myTeams.findIndex((item) => item.id == teamId)
    state.myTeams.splice(index, 1)

    let index2 = state.teams.findIndex((item) => item.id == teamId)
    state.teams.splice(index2, 1)
  },
  [types.ADD_PLAYER](state, player) {
    state.players = [...state.players, player]
  },
  [types.GET_PLAYERS_BY_TEAMID](state, players) {
    state.players = [...players]
    let index = state.myTeams.findIndex((item) => item.id == players[0].teamId)
    state.myTeams[index].players = [...players]
    let index2 = state.teams.findIndex((item) => item.id == players[0].teamId)
    state.players[index2] = [...players]
  },
  [types.UPDATE_PLAYER](state, player) {
    let previousPlayer = state.players.find((a) => a.id === player.id)
    Object.assign(previousPlayer, player)
  },
  [types.DELETE_PLAYER](state, playerId) {
    let index = state.players.findIndex((item) => item.id == playerId)
    state.players.splice(index, 1)
  },
  [types.UPLOAD_IMAGE]() {},
  [types.GET_USERSCORERS](state, pichichiList) {
    state.pichichiList = [...pichichiList]
  },
  [types.GET_USERCARDS](state, cardList) {
    state.cardList = [...cardList]
  }
}
