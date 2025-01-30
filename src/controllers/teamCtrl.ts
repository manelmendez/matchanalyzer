import { Request, Response } from 'express'
import { GoalController } from './goalCtrl.js'
import { CardController } from './cardCtrl.js'
import { TeamService } from '../dao-postgres/team-service.js'
import { GoalService } from '../dao-postgres/goal-service.js'
import { CardService } from '../dao-postgres/card-service.js'
import { RoundService } from '../dao-postgres/round-service.js'
import { MatchService } from '../dao-postgres/match-service.js'
import { PlayerService } from '../dao-postgres/player-service.js'
import { Team } from '../models/team.js'
import { Match } from '../models/match.js'
import { Round } from '../models/round.js'
import { CardItem, Pichichi, TeamRanking, TeamStats } from '../models/types.js'
import { Player } from '../models/player.js'

export class TeamController {
  private teamService: TeamService
  private roundService: RoundService
  private matchService: MatchService
  private goalService: GoalService
  private cardService: CardService
  private goalController: GoalController
  private cardController: CardController

  constructor (teamService: TeamService, roundService: RoundService, matchService: MatchService, goalService: GoalService, cardService: CardService, playerService: PlayerService) {
    this.teamService = teamService
    this.roundService = roundService
    this.matchService = matchService
    this.goalService = goalService
    this.cardService = cardService
    this.goalController = new GoalController(goalService, playerService)
    this.cardController = new CardController(cardService, playerService)
  }

  addTeam = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    // getting data
    const team: Team = {
      name: req.body.name,
      managerId: req.body.managerId,
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
      const teamSaved: Team = await this.teamService.saveTeam(team)
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

  addNoManagerTeam = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    const team: Team = {
      name: req.body.name,
      season: req.body.season,
      avatar:
        req.body.avatar != null
          ? req.body.avatar
          : 'assets/images/escudo-vacio.png',
      signupDate: new Date(),
      competitionId: req.body.competition,
      userId
    }
    console.log('Registrando equipo con nombre: ' + team.name + '...')
    try {
      const teamSaved: Team = await this.teamService.saveTeam(team)
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

  getTeam = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    const id: number = Number(req.params.id)
    console.log('Buscando equipo con id: ' + id + ' en la base de datos...')
    // search team on DB
    try {
      const team: Team = await this.teamService.findById(id, userId)
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

  // getAllTeams = async (req: Request, res: Response) => {
  //   console.log('Buscando todos los equipos en la base de datos...')
  //   try {
  //     const teams: Team[] = await this.teamService.findAll()
  //     console.log('Equipos encontrados.')
  //     res.status(200).send({
  //       teams
  //     })
  //   } catch (err) {
  //     console.log(`Error: ${err}`)
  //   }
  // }

  getUserTeams = async (req: Request, res: Response) => {
    const managerId: number = Number(req.params.userId)
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    console.log(
      'Buscando equipos del usuario ' + managerId + ' en la base de datos...'
    )
    // search team on DB
    try {
      const teams: Team[] = await this.teamService.findByManager(managerId, userId)
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

  updateTeam = async (req: Request, res: Response) => {
    const team: Team = req.body.team
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    const id: number = Number(req.params.id)
    try {
      const value: Team = await this.teamService.updateTeam(id, team, userId)
      res.status(200).send({ team: value })
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: 'Error al editar team' })
    }
  }

  deleteTeam = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    try {
      const value = await this.teamService.deleteTeam(id, userId)
      res.status(200).send({ team: value })
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: 'Error al borrar el equipo' })
    }
  }

  getTeamStats = async (req: Request, res: Response) => {    
    const teamId: number = Number(req.params.teamId)
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    try {
      const competitionId: number = Number(req.params.competitionId)        
      const rounds: Round[] = await this.roundService.findByCompetition(competitionId, userId)
      const matches: Match[] = await this.matchService.findByCompetition(competitionId, userId)
      const teams: Team[] = await this.teamService.findByCompetition(competitionId, userId)

      if (rounds.length == 0 || matches.length == 0) {
        return res.status(200).send({teamStats: {}})
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
      const roundRankings: Round[] = []
      for (let r = 0; r < rounds.length; r++) {
        const roundRanking: Round = rounds[r]
        const updatedTeams: Team[] = []        
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
            homeGoals: 0,
            awayGoals: 0,
            goalDif: 0,
            homeGoalDif: 0,
            awayGoalDif: 0,
            againstGoals: 0,
            homeAgainstGoals: 0,
            awayAgainstGoals: 0
          }
          const actualRound: number = r + 1
          let matches: Match[] | undefined = []
          for (let j = 0; j < actualRound; j++) {            
            matches = rounds[j].matches                
            let x: number = 0
            let found: boolean = false
            if (matches!=undefined) {
              while (x < matches.length && !found) {
                if (matches[x].localTeam?.id == updatedTeam.id) {
                  teamStats.gamesPlayed += 1
                  teamStats.homeGamesPlayed += 1
                  teamStats.goals += Number(matches[x].localTeamGoals)
                  teamStats.goalDif +=
                    Number(matches[x].localTeamGoals) -
                    Number(matches[x].awayTeamGoals)
                  teamStats.homeGoals += Number(matches[x].localTeamGoals)
                  teamStats.againstGoals += Number(matches[x].awayTeamGoals)
                  teamStats.homeGoalDif +=
                    Number(matches[x].localTeamGoals) -
                    Number(matches[x].awayTeamGoals)
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
                } else if (matches[x].awayTeam?.id == teams[i].id) {
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
        roundRanking.ranking = updatedTeams.sort(function (b, a) {
          // comprobar que ambos equipos tengan stats
          if (a.stats!== undefined && b.stats !== undefined ){
            // si los puntos de los dos equipos son distintos
            if (a.stats.points !== b.stats.points) {
              // devuelve positivo (+) o negativo (-) según quien tenga más
              return a.stats.points - b.stats.points
            } else if (a.stats?.points === b.stats?.points) { // si los puntos son iguales pasa a hacer lo siguiente:
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
        roundRankings.push(roundRanking)
      }

      const team = roundRankings[roundRankings.length - 1].ranking?.find((element) => element.id == teamId)     
      const position = roundRankings[roundRankings.length - 1].ranking?.findIndex((element) => element.id == teamId)
      if (team && team.stats) {
        team.stats.position = Number(position) + 1;
      }
      const teamRanking: TeamRanking = {...team, position: Number(position) + 1}

      // let teamStats: any = []  
      // const team = roundRankings[roundRankings.length - 1].ranking?.find((element) => element.id == teamId)      
      // const position = roundRankings[roundRankings.length - 1].ranking?.findIndex((element) => element.id == teamId)
      // teamStats = team
      // teamStats.position = Number(position) + 1
      // console.log(teamStats);
      

      res.status(200).send({teamStats: teamRanking})
    } catch (err) {
      console.log(err)
      res.status(404).send({ message: 'No hay jornadas disputadas' })
    }
  }

  getTeamScorers = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    const teamId: number = Number(req.params.id)
    const competitionId: number = Number(req.params.competitionId)
    try {
      const players: Player[] = await this.goalController.getPlayerTeamGoals(teamId, userId)
      const rounds: Round[] = await this.roundService.findByCompetition(competitionId, userId)
      const pichichiList: Pichichi[] = []
      for (const player of players) {
        let sumRoundGoals: number = 0
        const pichichiItem: Pichichi = {
          playerId: player.id,
          playerName: player.firstname + ' ' + player.lastname,
          totalGoals: 0,
          roundsGoals: []
        }
        for (const round of rounds) {
          let goalsInRound: number = 0
          if (player.goals) {
            for (const goal of player.goals) {
              if (round.id === goal.roundId) {
                goalsInRound++
                pichichiItem.totalGoals++
              }
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
        (a, b) => b.totalGoals - a.totalGoals
      )
      res.status(200).send({ pichichiList })
    } catch (error) {
      console.log(error)
      res
        .status(404)
        .send({ message: 'No hay jornadas disputadas, por lo que no hay stats' })
    }
  }

  getTeamCards = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(400).json({ error: 'No userId provided in Auth' });
    }
    const userId: number = req.user.id
    const teamId: number = Number(req.params.id)
    const competitionId: number = Number(req.params.competitionId)
    try {
      const players: Player[] = await this.cardController.getPlayerTeamCards(teamId, userId)
      const rounds: Round[] = await this.roundService.findByCompetition(competitionId, userId)
      const cardList: CardItem[] = []
      for (const player of players) {
        const cardItem: CardItem = {
          playerId: player.id,
          playerName: player.firstname + ' ' + player.lastname,
          totalCards: 0,
          roundCards: []
        }
        for (const round of rounds) {
          let cardsInRound = 0
          if (player.cards) {
            for (const card of player.cards) {
              if (round.id === card.roundId) {
                cardsInRound++
                cardItem.totalCards++
              }
            }
          }
          if (cardItem.totalCards === 0) cardItem.roundCards.push(0)
          else cardItem.roundCards.push(cardsInRound !== 0 ? cardsInRound : null)
        }
        cardList.push(cardItem)
      }
      cardList.sort((a, b) => b.totalCards - a.totalCards)
      res.status(200).send({ cardList })
    } catch (error) {
      console.log(error)
      res
        .status(404)
        .send({ message: 'No hay jornadas disputadas, por lo que no hay stats' })
    }
  }
}
