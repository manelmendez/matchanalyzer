/* eslint-disable no-async-promise-executor */
import competitionService from '../dao-postgres/competition-service.js'
import teamService from '../dao-postgres/team-service.js'
import roundService from '../dao-postgres/round-service.js'
import matchService from '../dao-postgres/match-service.js'

const addCompetition = async (req, res) => {
  let userId = req.user.id
  let competition = {
    name: req.body.name,
    season: req.body.season,
    manager: req.body.manager,
    discipline: req.body.discipline,
    category: req.body.category,
    signupDate: new Date(),
    userId: userId
  }
  console.log('Registrando competicion con nombre: ' + competition.name + '...')
  try {
    const competitionSaved = await competitionService.saveCompetition(
      competition
    )
    return res.status(200).send({
      competition: competitionSaved
    })
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      message: `Error al crear competición`
    })
  }
}

const getCompetition = async (req, res) => {
  let id = req.params.id
  let userId = req.user.id
  console.log('Buscando competición con id: ' + id + ' en la base de datos...')
  try {
    let result = await competitionService.findById(id, req.user.id, userId)
    if (result.length != 0) {
      let competition = JSON.parse(JSON.stringify(result))
      let teams = await teamService.findByCompetition(id, userId)
      competition.teams = JSON.parse(JSON.stringify(teams))
      res.status(200).send({
        competition: competition
      })
    } else {
      console.log('No existe la competición.')
      return res.status(404).send({
        message: 'No se ha encontrado la competición'
      })
    }
  } catch (err) {
    console.log(`Error: ${err}`)
    return res.status(500).send({
      message: `Error al buscar`
    })
  }
}

const getUserCompetitions = async (req, res) => {
  let id = req.params.id
  let userId = req.user.id
  console.log('Buscando todas las competiciones en la base de datos...')
  try {
    let competitions = await competitionService.findByManager(id, userId)
    console.log('Competiciones encontradas.')
    let competitionsWithStats = await getCompetitionRanking(
      competitions,
      userId
    )
    if (competitionsWithStats) {
      res.status(200).send({
        competitions: competitionsWithStats
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const updateCompetition = async (req, res) => {
  let userId = req.user.id
  const competition = {
    name: req.body.name,
    season: req.body.season,
    manager: req.body.manager,
    discipline: req.body.discipline,
    category: req.body.category
  }
  competitionService
    .updateCompetition(competition, req.params.id, userId)
    .then(() => {
      res.status(200).send({ competition: competition })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: `Error al actualizar el partido` })
    })
}
const deleteCompetition = async (req, res) => {
  let userId = req.user.id
  try {
    await competitionService.deleteCompetition(req.params.id, userId)
    return res.status(200).send({ competition: req.params.id })
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      message: `Error al borrar la competición`
    })
  }
}

const getCompetitionRanking = async (competitions, userId) => {
  let competitionsWithStats = []
  for (let c = 0; c < competitions.length; c++) {
    let rounds = await roundService.findByCompetition(
      competitions[c].id,
      userId
    )
    let matches = await matchService.findByCompetition(
      competitions[c].id,
      userId
    )
    let teams = await teamService.findByCompetition(competitions[c].id, userId)
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
        goalDif: 0,
        homeGoals: 0,
        homeGoalDif: 0,
        awayGoals: 0,
        awayGoalDif: 0,
        againstGoals: 0,
        homeAgainstGoals: 0,
        awayAgainstGoals: 0
      }
      for (let j = 0; j < rounds.length; j++) {
        let matches = rounds[j].matches
        let x = 0
        let found = false
        while (x < matches.length && !found) {
          if (matches[x].localTeam.id == teams[i].id) {
            teamStats.gamesPlayed += 1
            teamStats.homeGamesPlayed += 1
            teamStats.goals += Number(matches[x].localTeamGoals)
            teamStats.goalDif +=
              Number(matches[x].localTeamGoals) -
              Number(matches[x].awayTeamGoals)
            teamStats.homeGoals += Number(matches[x].localTeamGoals)
            teamStats.homeGoalDif +=
              Number(matches[x].localTeamGoals) -
              Number(matches[x].awayTeamGoals)
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
            teamStats.goalDif +=
              Number(matches[x].awayTeamGoals) -
              Number(matches[x].localTeamGoals)
            teamStats.againstGoals += Number(matches[x].localTeamGoals)
            teamStats.awayGoalDif +=
              Number(matches[x].awayTeamGoals) -
              Number(matches[x].localTeamGoals)
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
    updatedTeams.sort(function (b, a) {
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
    competitions[c].teams = updatedTeams
    competitionsWithStats.push(competitions[c])
  }
  return competitionsWithStats
}

export default {
  addCompetition,
  getCompetition,
  getUserCompetitions,
  updateCompetition,
  deleteCompetition
}
