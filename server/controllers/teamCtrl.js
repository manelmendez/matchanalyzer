// const Team = require('../models/team.js')
// const competitionService = require('../dao/competition-service')
import teamService from '../dao-postgres/team-service.js'
import roundService from '../dao-postgres/round-service.js'
import matchService from '../dao-postgres/match-service.js'

const addTeam = async (req, res) => {
  let userId = req.user.id
  // getting data
  let team = {
    name: req.body.name,
    manager: req.body.manager,
    season: req.body.season,
    avatar:
      req.body.avatar != null
        ? req.body.avatar
        : 'assets/images/escudo-vacio.png',
    signupDate: new Date(),
    userId: userId
  }
  console.log('Registrando equipo con nombre: ' + team.name + '...')
  try {
    const teamSaved = await teamService.saveTeam(team)
    return res.status(200).send({
      team: teamSaved
    })
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      message: `Error al registrar el equipo`
    })
  }
}

const addNoManagerTeam = async (req, res) => {
  let userId = req.user.id
  let team = {
    name: req.body.name,
    season: req.body.season,
    avatar:
      req.body.avatar != null
        ? req.body.avatar
        : 'assets/images/escudo-vacio.png',
    signupDate: new Date(),
    competition: req.body.competition,
    userId: userId
  }
  console.log('Registrando equipo con nombre: ' + team.name + '...')
  try {
    const teamSaved = await teamService.saveTeam(team)
    return res.status(200).send({
      team: teamSaved
    })
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      message: `Error al registrar el equipo`
    })
  }
}

const getTeam = async (req, res) => {
  let userId = req.user.id
  let teamId = req.params.id
  console.log('Buscando equipo con id: ' + teamId + ' en la base de datos...')
  //search team on DB
  try {
    const team = await teamService.findById(teamId, userId)
    if (team) {
      console.log('Equipo ' + team.name + ' entontrado.')
      res.status(200).send({
        message: 'Datos obtenidos correctamente',
        team: team
      })
    } else {
      console.log('No existe el equipo.')
      return res.status(401).send({
        message: 'No se ha encontrado el equipo'
      })
    }
  } catch (err) {
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al buscar`
    })
  }
}

const getAllTeams = async (req, res) => {
  console.log('Buscando todos los equipos en la base de datos...')
  try {
    const teams = await teamService.findAll()
    console.log('Equipos encontrados.')
    res.status(200).send({
      teams: teams
    })
  } catch (err) {
    console.log(`Error: ${err}`)
  }
}

const getUserTeams = async (req, res) => {
  let managerId = req.params.userId
  let userId = req.user.id
  console.log(
    'Buscando equipos del usuario ' + managerId + ' en la base de datos...'
  )
  //search team on DB
  try {
    const teams = await teamService.findByManager(managerId, userId)
    if (teams) {
      console.log('Equipos de ' + managerId + ' entontrados.')
      // send user
      res.status(200).send({
        message: 'Datos obtenidos correctamente',
        teams: teams
      })
    } else {
      console.log('No existen equipos.')
      return res.status(401).send({
        message: 'No se han encontrado equipos'
      })
    }
  } catch (err) {
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al buscar`
    })
  }
}

const updateTeam = async (req, res) => {
  let team = req.body.team
  let userId = req.user.id
  try {
    const value = await teamService.updateTeam(req.params.id, team, userId)
    res.status(200).send({ team: value })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: `Error al editar team` })
  }
}

const deleteTeam = async (req, res) => {
  let teamId = req.params.id
  let userId = req.user.id
  try {
    const value = await teamService.deleteTeam(teamId, userId)
    res.status(200).send({ team: value })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: `Error al borrar el equipo` })
  }
}

const getTeamStats = async (req, res) => {
  let teamId = req.params.teamId
  let competitionId = req.params.competitionId
  let userId = req.user.id
  try {
    let rounds = await roundService.findByCompetition(competitionId, userId)
    let matches = await matchService.findByCompetition(competitionId, userId)
    let teams = await teamService.findByCompetition(competitionId, userId)
    for (let i = 0; i < rounds.length; i++) {
      rounds[i].matches = []
      for (let j = 0; j < matches.length; j++) {
        for (let k = 0; k < teams.length; k++) {
          if (matches[j].localTeam == teams[k].id) {
            matches[j].localTeam = JSON.parse(JSON.stringify(teams[k]))
          }
          if (matches[j].awayTeam == teams[k].id) {
            matches[j].awayTeam = JSON.parse(JSON.stringify(teams[k]))
          }
        }
        if (rounds[i].id == matches[j].round) {
          rounds[i].matches.push(JSON.parse(JSON.stringify(matches[j])))
        }
      }
    }
    let roundRankings = []
    for (let r = 0; r < rounds.length; r++) {
      let roundRanking = JSON.parse(JSON.stringify(rounds[r]))
      let updatedTeams = []
      // sumar todas las jornadas hasta la seleccionada
      for (let i = 0; i < teams.length; i++) {
        let updatedTeam = JSON.parse(JSON.stringify(teams[i]))
        let teamStats = {
          gamesPlayed: 0,
          homeGamesPlayed: 0,
          awayGamesPlayed: 0,
          points: 0,
          homePoints: 0,
          awayPoints: 0,
          wins: 0,
          homeWins: 0,
          awayWins: 0,
          draws: 0,
          homeDraws: 0,
          awayDraws: 0,
          loses: 0,
          homeLoses: 0,
          awayLoses: 0,
          goals: 0,
          homeGoals: 0,
          awayGoals: 0,
          againstGoals: 0,
          homeAgainstGoals: 0,
          awayAgainstGoals: 0
        }
        let actualRound = r + 1
        for (let j = 0; j < actualRound; j++) {
          let matches = rounds[j].matches
          let x = 0
          let found = false
          while (x < matches.length && !found) {
            if (matches[x].localTeam.id == teams[i].id) {
              teamStats.gamesPlayed += 1
              teamStats.homeGamesPlayed += 1
              teamStats.goals += Number(matches[x].localTeamGoals)
              teamStats.homeGoals += Number(matches[x].localTeamGoals)
              teamStats.againstGoals += Number(matches[x].awayTeamGoals)
              teamStats.homeAgainstGoals += Number(matches[x].awayTeamGoals)
              if (
                Number(matches[x].localTeamGoals) >
                Number(matches[x].awayTeamGoals)
              ) {
                teamStats.homePoints += 3
                teamStats.points += 3
                teamStats.wins += 1
                teamStats.homeWins += 1
              } else if (
                Number(matches[x].localTeamGoals) ==
                Number(matches[x].awayTeamGoals)
              ) {
                teamStats.homePoints += 1
                teamStats.points += 1
                teamStats.draws += 1
                teamStats.homeDraws += 1
              } else if (
                Number(matches[x].localTeamGoals) <
                Number(matches[x].awayTeamGoals)
              ) {
                teamStats.homePoints += 0
                teamStats.points += 0
                teamStats.loses += 1
                teamStats.homeLoses += 1
              }
              found = true
            } else if (matches[x].awayTeam.id == teams[i].id) {
              teamStats.gamesPlayed += 1
              teamStats.awayGamesPlayed += 1
              teamStats.goals += Number(matches[x].awayTeamGoals)
              teamStats.awayGoals += Number(matches[x].awayTeamGoals)
              teamStats.againstGoals += Number(matches[x].localTeamGoals)
              teamStats.awayAgainstGoals += Number(matches[x].localTeamGoals)
              if (
                Number(matches[x].awayTeamGoals) >
                Number(matches[x].localTeamGoals)
              ) {
                teamStats.awayPoints += 3
                teamStats.points += 3
                teamStats.wins += 1
                teamStats.awayWins += 1
              } else if (
                Number(matches[x].awayTeamGoals) ==
                Number(matches[x].localTeamGoals)
              ) {
                teamStats.awayPoints += 1
                teamStats.points += 1
                teamStats.draws += 1
                teamStats.awayDraws += 1
              } else if (
                Number(matches[x].awayTeamGoals) <
                Number(matches[x].localTeamGoals)
              ) {
                teamStats.awayPoints += 0
                teamStats.points += 0
                teamStats.loses += 1
                teamStats.awayLoses += 1
              }
              found = true
            }
            x++
          }
        }
        updatedTeam.stats = teamStats
        updatedTeams.push(updatedTeam)
      }
      // esto ordena primero por puntos y luego por diferencia de goles
      roundRanking.ranking = updatedTeams.sort(function (b, a) {
        //si los puntos de los dos equipos son distintos
        if (a.stats.points !== b.stats.points) {
          //devuelve positivo (+) o negativo (-) según quien tenga más
          return a.stats.points - b.stats.points
        }
        //si los puntos son iguales pasa a hacer lo siguiente:
        else if (a.stats.points == b.stats.points) {
          let matches = []
          //coger todos los partidos
          for (let x = 0; x < rounds.length; x++) {
            matches = [...matches, ...rounds[x].matches]
          }
          let duelMatches = []
          //buscar los partidos que esos 2 equipos hayan jugado entre ellos
          for (let y = 0; y < matches.length; y++) {
            if (
              (matches[y].localTeam.id === a.id &&
                matches[y].awayTeam.id === b.id) ||
              (matches[y].localTeam.id === b.id &&
                matches[y].awayTeam.id === a.id)
            ) {
              duelMatches.push(matches[y])
            }
          }
          //buscar diferencia de victorias/empates/derrotas
          let aWin = 0
          let aDraw = 0
          let aLose = 0
          let goalDifference = 0
          for (let z = 0; z < duelMatches.length; z++) {
            if (
              duelMatches[z].localTeam.id == a.id &&
              Number(duelMatches[z].localTeamGoals) >
                Number(duelMatches[z].awayTeamGoals)
            ) {
              aWin++
              goalDifference +=
                Number(duelMatches[z].localTeamGoals) -
                Number(duelMatches[z].awayTeamGoals)
            } else if (
              duelMatches[z].awayTeam.id == a.id &&
              Number(duelMatches[z].awayTeamGoals) >
                Number(duelMatches[z].localTeamGoals)
            ) {
              aWin++
              goalDifference +=
                Number(duelMatches[z].awayTeamGoals) -
                Number(duelMatches[z].localTeamGoals)
            } else if (
              duelMatches[z].localTeam.id == a.id &&
              Number(duelMatches[z].localTeamGoals) ==
                Number(duelMatches[z].awayTeamGoals)
            ) {
              aDraw++
            } else if (
              duelMatches[z].awayTeam.id == a.id &&
              Number(duelMatches[z].awayTeamGoals) ==
                Number(duelMatches[z].localTeamGoals)
            ) {
              aDraw++
            } else if (
              duelMatches[z].localTeam.id == a.id &&
              Number(duelMatches[z].localTeamGoals) <
                Number(duelMatches[z].awayTeamGoals)
            ) {
              aLose++
              goalDifference +=
                Number(duelMatches[z].localTeamGoals) -
                Number(duelMatches[z].awayTeamGoals)
            } else if (
              duelMatches[z].awayTeam.id == a.id &&
              Number(duelMatches[z].awayTeamGoals) <
                Number(duelMatches[z].localTeamGoals)
            ) {
              aLose++
              goalDifference +=
                Number(duelMatches[z].awayTeamGoals) -
                Number(duelMatches[z].localTeamGoals)
            }
          }
          //si se han jugado los 2 partidos entre ellos
          if (duelMatches.length == 2) {
            if (aWin == 2 || (aWin == 1 && aDraw == 1)) {
              return 1
            } else if (aLose == 2 || (aLose == 1 && aDraw == 1)) {
              return -1
            }
            //si es igual, buscar diferencia de goles individual (no cuenta doble fuera de casa)
            else {
              if (goalDifference > 0) {
                return 1
              } else {
                return -1
              }
            }
          }
          //si solo se ha jugado 1
          else if (duelMatches.length == 1) {
            if (aWin == 1) {
              return 1
            } else if (aLose == 1) {
              return -1
            }
          }
        }
        //si el goal average particular es igual pasa a hacer lo siguiente:
        //si la diferencia de goles entre los dos equipos es igual en ambos
        else if (
          a.stats.goals - a.stats.againstGoals ===
          b.stats.goals - b.stats.againstGoals
        ) {
          //devuelve 0
          return 0
        }
        //si los puntos de los equipos son iguales y la diferencia de goles es distinta
        //devuelve +1 o -1 según quien tenga más goles
        return a.stats.goals - a.stats.againstGoals >
          b.stats.goals - b.stats.againstGoals
          ? 1
          : -1
      })
      roundRankings.push(roundRanking)
    }
    let teamStats = {}
    for (
      let f = 0;
      f < roundRankings[roundRankings.length - 1].ranking.length;
      f++
    ) {
      if (roundRankings[roundRankings.length - 1].ranking[f].id == teamId) {
        teamStats = roundRankings[roundRankings.length - 1].ranking[f]
        teamStats.position = f + 1
      }
    }
    res.status(200).send({ teamStats: teamStats })
  } catch (err) {
    console.log(err)
    res.status(404).send({ message: 'No hay jornadas disputadas' })
  }
}

export default {
  addTeam,
  getTeam,
  getAllTeams, //
  getUserTeams,
  addNoManagerTeam,
  updateTeam,
  deleteTeam,
  getTeamStats
}
