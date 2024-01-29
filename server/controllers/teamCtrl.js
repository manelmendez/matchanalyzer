import { GoalController } from './goalCtrl.js'
import { CardController } from './cardCtrl.js'

export class TeamController {
  constructor ({ TeamModel, RoundModel, MatchModel, GoalModel, CardModel, PlayerModel }) {
    this.teamModel = TeamModel
    this.roundModel = RoundModel
    this.matchModel = MatchModel
    this.goalModel = GoalModel
    this.cardModel = CardModel
    this.goalController = new GoalController({ GoalModel, PlayerModel })
    this.cardController = new CardController({ CardModel, PlayerModel })
  }

  addTeam = async (req, res) => {
    const userId = req.user.id
    // getting data
    const team = {
      name: req.body.name,
      manager: req.body.manager,
      season: req.body.season,
      avatar:
        req.body.avatar != null
          ? req.body.avatar
          : 'assets/images/escudo-vacio.png',
      signupDate: new Date(),
      userId
    }
    console.log('Registrando equipo con nombre: ' + team.name + '...')
    try {
      const teamSaved = await this.teamModel.saveTeam({ team })
      return res.status(200).send({
        team: teamSaved
      })
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        message: 'Error al registrar el equipo'
      })
    }
  }

  addNoManagerTeam = async (req, res) => {
    const userId = req.user.id
    const team = {
      name: req.body.name,
      season: req.body.season,
      avatar:
        req.body.avatar != null
          ? req.body.avatar
          : 'assets/images/escudo-vacio.png',
      signupDate: new Date(),
      competition: req.body.competition,
      userId
    }
    console.log('Registrando equipo con nombre: ' + team.name + '...')
    try {
      const teamSaved = await this.teamModel.saveTeam({ team })
      return res.status(200).send({
        team: teamSaved
      })
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        message: 'Error al registrar el equipo'
      })
    }
  }

  getTeam = async (req, res) => {
    const userId = req.user.id
    const id = req.params.id
    console.log('Buscando equipo con id: ' + id + ' en la base de datos...')
    // search team on DB
    try {
      const team = await this.teamModel.findById({ id, userId })
      if (team) {
        console.log('Equipo ' + team.name + ' entontrado.')
        res.status(200).send({
          message: 'Datos obtenidos correctamente',
          team
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
        message: 'Error al buscar'
      })
    }
  }

  getAllTeams = async (req, res) => {
    console.log('Buscando todos los equipos en la base de datos...')
    try {
      const teams = await this.teamModel.findAll()
      console.log('Equipos encontrados.')
      res.status(200).send({
        teams
      })
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }

  getUserTeams = async (req, res) => {
    const managerId = req.params.userId
    const userId = req.user.id
    console.log(
      'Buscando equipos del usuario ' + managerId + ' en la base de datos...'
    )
    // search team on DB
    try {
      const teams = await this.teamModel.findByManager({ managerId, userId })
      if (teams) {
        console.log('Equipos de ' + managerId + ' entontrados.')
        // send user
        res.status(200).send({
          message: 'Datos obtenidos correctamente',
          teams
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
        message: 'Error al buscar'
      })
    }
  }

  updateTeam = async (req, res) => {
    const team = req.body.team
    const userId = req.user.id
    const id = req.params.id
    try {
      const value = await this.teamModel.updateTeam({ id, team, userId })
      res.status(200).send({ team: value })
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: 'Error al editar team' })
    }
  }

  deleteTeam = async (req, res) => {
    const id = req.params.id
    const userId = req.user.id
    try {
      const value = await this.teamModel.deleteTeam({ id, userId })
      res.status(200).send({ team: value })
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: 'Error al borrar el equipo' })
    }
  }

  getTeamStats = async (req, res) => {
    const teamId = req.params.teamId
    const competitionId = req.params.competitionId
    const userId = req.user.id
    try {
      const rounds = await this.roundModel.findByCompetition({ competitionId, userId })
      const matches = await this.matchModel.findByCompetition({ competitionId, userId })
      const teams = await this.teamModel.findByCompetition({ competitionId, userId })
      for (let i = 0; i < rounds.length; i++) {
        rounds[i].matches = []
        for (let j = 0; j < matches.length; j++) {
          for (let k = 0; k < teams.length; k++) {
            if (matches[j].localTeam === teams[k].id) {
              matches[j].localTeam = JSON.parse(JSON.stringify(teams[k]))
            }
            if (matches[j].awayTeam === teams[k].id) {
              matches[j].awayTeam = JSON.parse(JSON.stringify(teams[k]))
            }
          }
          if (rounds[i].id === matches[j].round) {
            rounds[i].matches.push(JSON.parse(JSON.stringify(matches[j])))
          }
        }
      }
      const roundRankings = []
      for (let r = 0; r < rounds.length; r++) {
        const roundRanking = JSON.parse(JSON.stringify(rounds[r]))
        const updatedTeams = []
        // sumar todas las jornadas hasta la seleccionada
        for (let i = 0; i < teams.length; i++) {
          const updatedTeam = JSON.parse(JSON.stringify(teams[i]))
          const teamStats = {
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
          const actualRound = r + 1
          for (let j = 0; j < actualRound; j++) {
            const matches = rounds[j].matches
            let x = 0
            let found = false
            while (x < matches.length && !found) {
              if (matches[x].localTeam.id === teams[i].id) {
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
                  Number(matches[x].localTeamGoals) ===
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
              } else if (matches[x].awayTeam.id === teams[i].id) {
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
                  Number(matches[x].awayTeamGoals) ===
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
          // si los puntos de los dos equipos son distintos
          if (a.stats.points !== b.stats.points) {
            // devuelve positivo (+) o negativo (-) según quien tenga más
            return a.stats.points - b.stats.points
          } else if (a.stats.points === b.stats.points) { // si los puntos son iguales pasa a hacer lo siguiente:
            let matches = []
            // coger todos los partidos
            for (let x = 0; x < rounds.length; x++) {
              matches = [...matches, ...rounds[x].matches]
            }
            const duelMatches = []
            // buscar los partidos que esos 2 equipos hayan jugado entre ellos
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
            // buscar diferencia de victorias/empates/derrotas
            let aWin = 0
            let aDraw = 0
            let aLose = 0
            let goalDifference = 0
            for (let z = 0; z < duelMatches.length; z++) {
              if (
                duelMatches[z].localTeam.id === a.id &&
                Number(duelMatches[z].localTeamGoals) >
                Number(duelMatches[z].awayTeamGoals)
              ) {
                aWin++
                goalDifference +=
                  Number(duelMatches[z].localTeamGoals) -
                  Number(duelMatches[z].awayTeamGoals)
              } else if (
                duelMatches[z].awayTeam.id === a.id &&
                Number(duelMatches[z].awayTeamGoals) >
                Number(duelMatches[z].localTeamGoals)
              ) {
                aWin++
                goalDifference +=
                  Number(duelMatches[z].awayTeamGoals) -
                  Number(duelMatches[z].localTeamGoals)
              } else if (
                duelMatches[z].localTeam.id === a.id &&
                Number(duelMatches[z].localTeamGoals) ===
                Number(duelMatches[z].awayTeamGoals)
              ) {
                aDraw++
              } else if (
                duelMatches[z].awayTeam.id === a.id &&
                Number(duelMatches[z].awayTeamGoals) ===
                Number(duelMatches[z].localTeamGoals)
              ) {
                aDraw++
              } else if (
                duelMatches[z].localTeam.id === a.id &&
                Number(duelMatches[z].localTeamGoals) <
                Number(duelMatches[z].awayTeamGoals)
              ) {
                aLose++
                goalDifference +=
                  Number(duelMatches[z].localTeamGoals) -
                  Number(duelMatches[z].awayTeamGoals)
              } else if (
                duelMatches[z].awayTeam.id === a.id &&
                Number(duelMatches[z].awayTeamGoals) <
                Number(duelMatches[z].localTeamGoals)
              ) {
                aLose++
                goalDifference +=
                  Number(duelMatches[z].awayTeamGoals) -
                  Number(duelMatches[z].localTeamGoals)
              }
            }
            // si se han jugado los 2 partidos entre ellos
            if (duelMatches.length === 2) {
              if (aWin === 2 || (aWin === 1 && aDraw === 1)) {
                return 1
              } else if (aLose === 2 || (aLose === 1 && aDraw === 1)) {
                return -1
              } else { // si es igual, buscar diferencia de goles individual (no cuenta doble fuera de casa)
                if (goalDifference > 0) {
                  return 1
                } else {
                  return -1
                }
              }
            } else if (duelMatches.length === 1) { // si solo se ha jugado 1
              if (aWin === 1) {
                return 1
              } else if (aLose === 1) {
                return -1
              }
            }
          } else if ( // si el goal average particular es igual pasa a hacer lo siguiente:
            // si la diferencia de goles entre los dos equipos es igual en ambos
            a.stats.goals - a.stats.againstGoals ===
            b.stats.goals - b.stats.againstGoals
          ) {
            // devuelve 0
            return 0
          }
          // si los puntos de los equipos son iguales y la diferencia de goles es distinta
          // devuelve +1 o -1 según quien tenga más goles
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
        if (roundRankings[roundRankings.length - 1].ranking[f].id === teamId) {
          teamStats = roundRankings[roundRankings.length - 1].ranking[f]
          teamStats.position = f + 1
        }
      }
      res.status(200).send({ teamStats })
    } catch (err) {
      console.log(err)
      res.status(404).send({ message: 'No hay jornadas disputadas' })
    }
  }

  getTeamScorers = async (req, res) => {
    const userId = req.user.id
    const teamId = req.params.id
    const competitionId = req.params.competitionId
    try {
      const players = await this.goalController.getPlayerTeamGoals({ teamId, userId })
      const rounds = await this.roundModel.findByCompetition({ competitionId, userId })
      const pichichiList = []
      for (const player of players) {
        let sumRoundGoals = 0
        const pichichiItem = {
          playerId: player.id,
          playerName: player.firstname + ' ' + player.lastname,
          totalGoals: 0,
          roundsGoals: []
        }
        for (const round of rounds) {
          let goalsInRound = 0
          for (const goal of player.goals) {
            if (round.id === goal.roundId) {
              goalsInRound++
              pichichiItem.totalGoals++
            }
          }
          sumRoundGoals += goalsInRound
          if (pichichiItem.totalGoals === 0) pichichiItem.roundsGoals.push(0)
          else {
            pichichiItem.roundsGoals.push(
              sumRoundGoals !== 0 ? sumRoundGoals : null
            )
          }
        }
        pichichiList.push(pichichiItem)
      }
      pichichiList.sort(
        (a, b) => parseFloat(b.totalGoals) - parseFloat(a.totalGoals)
      )
      res.status(200).send({ pichichiList })
    } catch (error) {
      console.log(error)
      res
        .status(404)
        .send({ message: 'No hay jornadas disputadas, por lo que no hay stats' })
    }
  }

  getTeamCards = async (req, res) => {
    const userId = req.user.id
    const teamId = req.params.id
    const competitionId = req.params.competitionId
    try {
      const players = await this.cardController.getPlayerTeamCards({ teamId, userId })
      const rounds = await this.roundModel.findByCompetition({ competitionId, userId })
      const cardList = []
      for (const player of players) {
        const cardItem = {
          playerId: player.id,
          playerName: player.firstname + ' ' + player.lastname,
          totalCards: 0,
          roundCards: []
        }
        for (const round of rounds) {
          let cardsInRound = 0
          for (const card of player.cards) {
            if (round.id === card.roundId) {
              cardsInRound++
              cardItem.totalCards++
            }
          }
          if (cardItem.totalCards === 0) cardItem.roundCards.push(0)
          else cardItem.roundCards.push(cardsInRound !== 0 ? cardsInRound : null)
        }
        cardList.push(cardItem)
      }
      cardList.sort((a, b) => parseFloat(b.totalCards) - parseFloat(a.totalCards))
      res.status(200).send({ cardList })
    } catch (error) {
      console.log(error)
      res
        .status(404)
        .send({ message: 'No hay jornadas disputadas, por lo que no hay stats' })
    }
  }
}
