import { Request, Response } from 'express'
import { CompetitionService } from '../dao-postgres/competition-service'
import { TeamService } from '../dao-postgres/team-service'
import { RoundService } from '../dao-postgres/round-service'
import { MatchService } from '../dao-postgres/match-service'
import { Competition } from '../models/competition'
import { TeamStats } from '../models/types'
import { Match } from '../models/match'
import { Team } from '../models/team'
import { Round } from '../models/round'

export class CompetitionController {
  private competitionService: CompetitionService
  private teamService: TeamService
  private roundService: RoundService
  private matchService: MatchService

  constructor (competitionService: CompetitionService, teamService: TeamService, roundService: RoundService, matchService: MatchService) {
    this.competitionService = competitionService
    this.teamService = teamService
    this.roundService = roundService
    this.matchService = matchService
  }

  addCompetition = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    const competition: Competition = {
      name: req.body.name,
      season: req.body.season,
      managerId: req.body.managerId,
      discipline: req.body.discipline,
      category: req.body.category,
      signupDate: new Date(),
      userId
    }
    console.log('Registrando competicion con nombre: ' + competition.name + '...')
    try {
      const competitionSaved =
        await this.competitionService.saveCompetition(competition)
      return res.status(200).send({
        competition: competitionSaved,
        message: "Competición creada correctamente"
      })
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        message: 'Error al crear competición'
      })
    }
  }

  getCompetition = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    const managerId: number = Number(req.user.id)
    console.log('Buscando competición con id: ' + id + ' en la base de datos...')
    try {
      const result: Competition[] = await this.competitionService.findById(id, managerId, userId)
      if (result.length !== 0) {
        const competition = JSON.parse(JSON.stringify(result))
        const teams = await this.teamService.findByCompetition(id, userId)
        competition.teams = JSON.parse(JSON.stringify(teams))
        res.status(200).send({
          competition
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
        message: 'Error al buscar'
      })
    }
  }

  getUserCompetitions = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    console.log('Buscando todas las competiciones en la base de datos...')
    try {
      const competitions = await this.competitionService.findByManager(id, userId)
      console.log('Competiciones encontradas.')
      const competitionsWithStats = await this.getCompetitionRanking(
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

  updateCompetition = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    const id: number = Number(req.params.id)
    const competition: Competition = {
      name: req.body.name,
      season: req.body.season,
      managerId: req.body.managerId,
      discipline: req.body.discipline,
      category: req.body.category,
      userId
    }
    try {
      const updatedCompetition: Competition = await this.competitionService.updateCompetition(competition, id, userId)
      res.status(200).send({ competition: updatedCompetition, message: "Competición editada correctamente" })
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: 'Error al actualizar la competición' })
    }
  }

  deleteCompetition = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    const id: number = Number(req.params.id)
    try {
      await this.competitionService.deleteCompetition(id, userId)
      return res.status(200).send({ competition: req.params.id, message: "Competición borrada correctamente" })
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        message: 'Error al borrar la competición'
      })
    }
  }

  getCompetitionRanking = async (competitions: Competition[], userId: number) => {
    const competitionsWithStats: Competition[] = []
    for (let c = 0; c < competitions.length; c++) {
      let rounds: Round[] = []
      let matches: Match[] = []
      let teams: Team[] = []

      const competitionId = competitions[c].id
      if (competitionId) {
        rounds = await this.roundService.findByCompetition(competitionId, userId)
        matches = await this.matchService.findByCompetition(competitionId, userId)
        teams = await this.teamService.findByCompetition(competitionId, userId)
      }
      
      for (let i = 0; i < rounds.length; i++) {
        rounds[i].matches = []
        for (let j = 0; j < matches.length; j++) {
          for (let k = 0; k < teams.length; k++) {            
            if (matches[j].localTeamId === teams[k].id) {
              matches[j].localTeam = teams[k]
            }
            if (matches[j].awayTeamId === teams[k].id) {
              matches[j].awayTeam = teams[k]
            }
          }
          if (rounds[i].id === matches[j].roundId) {
            rounds[i].matches?.push(matches[j]) // aunque salga el error, funciona pq hemos inicializado con rounds[i].matches = []
          }
        }
      }  
      const updatedTeams = []
      // sumar todas las jornadas hasta la seleccionada
      for (let i = 0; i < teams.length; i++) {
        const updatedTeam: Team = teams[i]
        const teamStats: TeamStats = {
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
        let matches: Match[] | undefined = []
        for (let j = 0; j < rounds.length; j++) {
          matches = rounds[j].matches    
          let x: number = 0
          let found: boolean = false
          if (matches!=undefined) {
            while (x < matches.length && !found) {
              if (matches[x].localTeam?.id === updatedTeam.id) {
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
              } else if (matches[x].awayTeam?.id === teams[i].id) {
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
        }
        updatedTeam.stats = teamStats
        updatedTeams.push(updatedTeam)
      }
      // esto ordena primero por puntos y luego por diferencia de goles
      updatedTeams.sort(function (b, a) {
        // comprobar que ambos equipos tengan stats
        if (a.stats!== undefined && b.stats !== undefined ){
          // si los puntos de los dos equipos son distintos
          if (a.stats.points !== b.stats.points) {
            // devuelve positivo (+) o negativo (-) según quien tenga más
            return a.stats.points - b.stats.points
          } else if (a.stats.points === b.stats.points) { // si los puntos son iguales pasa a hacer lo siguiente:
            let matches: Match[] = []
            // coger todos los partidos
            for (let x = 0; x < rounds.length; x++) {
              matches = [...matches, ...rounds[x].matches ?? []]
            }
            const duelMatches = []
            // buscar los partidos que esos 2 equipos hayan jugado entre ellos
            for (let y = 0; y < matches.length; y++) {
              if (
                (matches[y].localTeam?.id === a.id &&
                  matches[y].awayTeam?.id === b.id) ||
                (matches[y].localTeam?.id === b.id &&
                  matches[y].awayTeam?.id === a.id)
              ) {
                duelMatches.push(matches[y])
              }
            }
            // buscar diferencia de victorias/empates/derrotas
            let aWin: number = 0
            let aDraw: number = 0
            let aLose: number = 0
            let goalDifference: number = 0
            for (let z = 0; z < duelMatches.length; z++) {
              if (
                duelMatches[z].localTeam?.id === a.id &&
                Number(duelMatches[z].localTeamGoals) >
                Number(duelMatches[z].awayTeamGoals)
              ) {
                aWin++
                goalDifference +=
                  Number(duelMatches[z].localTeamGoals) -
                  Number(duelMatches[z].awayTeamGoals)
              } else if (
                duelMatches[z].awayTeam?.id === a.id &&
                Number(duelMatches[z].awayTeamGoals) >
                Number(duelMatches[z].localTeamGoals)
              ) {
                aWin++
                goalDifference +=
                  Number(duelMatches[z].awayTeamGoals) -
                  Number(duelMatches[z].localTeamGoals)
              } else if (
                duelMatches[z].localTeam?.id === a.id &&
                Number(duelMatches[z].localTeamGoals) ===
                Number(duelMatches[z].awayTeamGoals)
              ) {
                aDraw++
              } else if (
                duelMatches[z].awayTeam?.id === a.id &&
                Number(duelMatches[z].awayTeamGoals) ===
                Number(duelMatches[z].localTeamGoals)
              ) {
                aDraw++
              } else if (
                duelMatches[z].localTeam?.id === a.id &&
                Number(duelMatches[z].localTeamGoals) <
                Number(duelMatches[z].awayTeamGoals)
              ) {
                aLose++
                goalDifference +=
                  Number(duelMatches[z].localTeamGoals) -
                  Number(duelMatches[z].awayTeamGoals)
              } else if (
                duelMatches[z].awayTeam?.id === a.id &&
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
        }
        return 0
      })
      competitions[c].teams = updatedTeams
      competitionsWithStats.push(competitions[c])
    }
    return competitionsWithStats
  }
}
