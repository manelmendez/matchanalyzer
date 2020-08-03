import * as types from '../mutations/mutation-types'
import axios from 'axios'
// COMPETITION
export const addCompetition = ({ commit }, body) => {
  console.log('ACTION -- addCompetition')
  return axios
    .post('competitions', body)
    .then((response) => {
      commit(types.ADD_COMPETITION, response.data.competition)
      return response
    })
    .catch((err) => {
      return err.response
    })
}
export const getCompetition = ({ commit }, id) => {
  console.log('ACTION -- getCompetition')
  return axios.get('competitions/' + id).then((response) => {
    commit(types.GET_COMPETITION, response.data.competition)
  })
}
export const getUserCompetitions = ({ commit }, id) => {
  console.log('ACTION -- getUserCompetitions')
  return axios.get('competitions/user/' + id).then((response) => {
    commit(types.GET_COMPETITIONS, response.data.competitions)
  })
}
export const updateCompetition = ({ commit }, data) => {
  console.log('ACTION -- updateCompetition')
  return axios
    .put('competitions/' + data.id, data)
    .then((response) => {
      commit(types.UPDATE_COMPETITION, response.data)
      return response
    })
    .catch((err) => {
      return err.response
    })
}
export const deleteCompetition = ({ commit }, data) => {
  console.log('ACTION -- deleteCompetition')
  return axios
    .delete('competitions/' + data)
    .then((response) => {
      commit(types.DELETE_COMPETITION, response.data.id)
      return response
    })
    .catch((err) => {
      return err.response
    })
}

// ROUND
export const addRound = ({ commit }, body) => {
  console.log('ACTION -- addRound')
  return axios
    .post('rounds', body)
    .then((response) => {
      commit(types.ADD_ROUND, response.data.round)
      return response
    })
    .catch((err) => {
      return err.response
    })
}
export const getCompetitionRounds = ({ commit }, id) => {
  console.log('ACTION -- getCompetitionRounds')
  return axios.get('rounds/competition/' + id).then((response) => {
    commit(types.GET_COMPETITION_ROUNDS, response.data.rounds)
  })
}
export const deleteRound = ({ commit }, id) => {
  console.log('ACTION -- deleteRound')
  return axios
    .delete('rounds/' + id)
    .then((response) => {
      commit(types.DELETE_ROUND)
      return response
    })
    .catch((err) => {
      return err.response
    })
}
export const changeRound = ({ commit }, round) => {
  console.log('ACTION -- changeRound')
  return commit(types.CHANGE_ROUND, round)
}
export const previousRound = ({ commit }) => {
  console.log('ACTION -- previousRound')
  return commit(types.PREVIOUS_ROUND)
}
export const nextRound = ({ commit }) => {
  console.log('ACTION -- nextRound')
  return commit(types.NEXT_ROUND)
}

// MATCH
export const getMatch = ({ commit }, id) => {
  console.log('ACTION -- getMatch')
  return axios.get('matches/' + id).then((response) => {
    commit(types.GET_MATCH, response.data.match)
  })
}
export const addMatch = ({ commit }, body) => {
  console.log('ACTION -- addMatch')
  return axios
    .post('matches', body)
    .then((response) => {
      commit(types.ADD_MATCH, response.data)
      return response
    })
    .catch((err) => {
      return err.response
    })
}
export const updateMatch = ({ commit }, data) => {
  console.log('ACTION -- updateMatch')
  return axios
    .put('matches/' + data.id, data.body)
    .then((response) => {
      data.body.id = data.id
      commit(types.UPDATE_MATCH, data.body)
      return response
    })
    .catch((err) => {
      return err.response
    })
}
export const deleteMatch = ({ commit }, id) => {
  console.log('ACTION -- deleteMatch')
  return axios
    .delete('matches/' + id)
    .then((response) => {
      commit(types.DELETE_MATCH, id)
      return response
    })
    .catch((err) => {
      return err.response
    })
}

// MATCHPART
export const addMatchpart = ({ commit }, body) => {
  console.log('ACTION -- addMatchpart')
  return axios
    .post('matchparts', body)
    .then((response) => {
      commit(types.ADD_MATCHPART, response.data)
      return response
    })
    .catch((err) => {
      return err.response
    })
}
export const getMatchpartsByMatchId = ({ commit }, id) => {
  console.log('ACTION -- getMatchpartsByMatchId')
  return axios.get('matchparts/match/' + id).then((response) => {
    commit(types.GET_MATCHPARTSBYMATCHID, response.data)
  })
}

// MINUTES
export const getMinutesByMatchId = ({ commit }, id) => {
  console.log('ACTION -- getMinutesByMatchId')
  return axios.get('minutes/match/' + id).then((response) => {
    commit(types.GET_MINUTESBYMATCHID, response.data)
  })
}
export const addMinute = ({ commit }, body) => {
  console.log('ACTION -- addMinute')
  return axios
    .post('minutes', body)
    .then((response) => {
      commit(types.ADD_MINUTE, response.data)
      return response
    })
    .catch((err) => {
      return err.response
    })
}
export const deleteMinute = ({ commit }, data) => {
  console.log('ACTION -- deleteMinute')
  return axios
    .delete('minutes/' + data)
    .then((response) => {
      commit(types.DELETE_MINUTE, response.data.id)
      return response
    })
    .catch((err) => {
      return err.response
    })
}

// GOAL
export const getGoalsByMatchId = ({ commit }, id) => {
  console.log('ACTION -- getGoalsByMatchId')
  return axios.get('goals/match/' + id).then((response) => {
    commit(types.GET_GOALSBYMATCHID, response.data)
  })
}
export const addGoal = ({ commit }, body) => {
  console.log('ACTION -- addGoal')
  return axios
    .post('goals', body)
    .then((response) => {
      commit(types.ADD_GOAL, response.data)
      return response
    })
    .catch((err) => {
      return err.response
    })
}
export const deleteGoal = ({ commit }, data) => {
  console.log('ACTION -- deleteGoal')
  return axios
    .delete('goals/' + data)
    .then((response) => {
      commit(types.DELETE_GOAL, response.data.id)
      return response
    })
    .catch((err) => {
      return err.response
    })
}

// ASSIST
export const getAssistsByMatchId = ({ commit }, id) => {
  console.log('ACTION -- getAssistsByMatchId')
  return axios.get('assists/match/' + id).then((response) => {
    commit(types.GET_ASSISTSBYMATCHID, response.data)
  })
}
export const addAssist = ({ commit }, body) => {
  console.log('ACTION -- addAssist')
  return axios
    .post('assists', body)
    .then((response) => {
      commit(types.ADD_ASSIST, response.data)
      return response
    })
    .catch((err) => {
      return err.response
    })
}
export const deleteAssist = ({ commit }, data) => {
  console.log('ACTION -- deleteAssist')
  return axios
    .delete('assists/' + data)
    .then((response) => {
      commit(types.DELETE_ASSIST, response.data.id)
      return response
    })
    .catch((err) => {
      return err.response
    })
}

// CARDS
export const getCardsByMatchId = ({ commit }, id) => {
  console.log('ACTION -- getCardsByMatchId')
  return axios.get('cards/match/' + id).then((response) => {
    commit(types.GET_CARDSBYMATCHID, response.data)
  })
}
export const addCard = ({ commit }, body) => {
  console.log('ACTION -- addCard')
  return axios
    .post('cards', body)
    .then((response) => {
      commit(types.ADD_CARD, response.data)
      return response
    })
    .catch((err) => {
      return err.response
    })
}
export const deleteCard = ({ commit }, data) => {
  console.log('ACTION -- deleteCard')
  return axios
    .delete('cards/' + data)
    .then((response) => {
      commit(types.DELETE_CARD, response.data.id)
      return response
    })
    .catch((err) => {
      return err.response
    })
}

// SUBSTITUTIONS
export const getSubstitutionsByMatchId = ({ commit }, id) => {
  console.log('ACTION -- getSubstitutionsByMatchId')
  return axios.get('substitutions/match/' + id).then((response) => {
    commit(types.GET_SUBSTITUTIONSBYMATCHID, response.data)
  })
}
export const addSubstitution = ({ commit }, body) => {
  console.log('ACTION -- addSubstitution')
  return axios
    .post('substitutions', body)
    .then((response) => {
      commit(types.ADD_SUBSTITUTION, response.data)
      return response
    })
    .catch((err) => {
      return err.response
    })
}
export const deleteSubstitution = ({ commit }, data) => {
  console.log('ACTION -- deleteSubstitution')
  return axios
    .delete('substitutions/' + data)
    .then((response) => {
      commit(types.DELETE_SUBSTITUTION, response.data.id)
      return response
    })
    .catch((err) => {
      return err.response
    })
}
