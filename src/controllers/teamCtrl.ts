import { NextFunction, Request, Response } from 'express'
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
import errorHelper, { CustomError } from '../utils/errorHelper.js'

export class TeamController {
  private teamService: TeamService
  private roundService: RoundService
  private matchService: MatchService
  private goalService: GoalService
  private cardService: CardService
  private goalController: GoalController
  private cardController: CardController

  constructor(teamService: TeamService, roundService: RoundService, matchService: MatchService, goalService: GoalService, cardService: CardService, playerService: PlayerService) {
    this.teamService = teamService
    this.roundService = roundService
    this.matchService = matchService
    this.goalService = goalService
    this.cardService = cardService
    this.goalController = new GoalController(goalService, playerService)
    this.cardController = new CardController(cardService, playerService)
  }

  addTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        return errorHelper.unauthorizedError('No userId provided in Auth')
      }
      const userId: number = req.user?.id as number
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
      if (!team.name || !team.season || !team.avatar || !team.signupDate) {
        return errorHelper.badRequestError('Faltan campos de equipo por enviar')
      }
      console.log('Registrando equipo con nombre: ' + team.name + '...')
      try {
        console.log(team)
        const teamSaved: Team = await this.teamService.saveTeam(team)
        res.status(200).send({
          team: teamSaved,
          message: "Equipo creado correctamente"
        })
      } catch (error: unknown) {
        console.log(error)
        errorHelper.internalServerError((error as CustomError).message)
      }
    } catch (err) {
      next(err)
    }
  }

  addNoManagerTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        errorHelper.unauthorizedError('No userId provided in Auth')
      }
      const userId: number = req.user?.id as number
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
        res.status(200).send({
          team: teamSaved,
          message: "Equipo creado correctamente"
        })
      } catch (err) {
        console.log(err)
        errorHelper.internalServerError('Error al añadir equipo')
      }
    } catch (err) {
      next(err)
    }
  }

  getTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        errorHelper.unauthorizedError('No userId provided in Auth')
      }
      const userId: number = req.user?.id as number
      const id: number = Number(req.params.id)
      console.log('Buscando equipo con id: ' + id + ' en la base de datos...')
      // search team on DB

      const team: Team = await this.teamService.findById(id, userId)
      if (team) {
        console.log('Equipo ' + team.name + ' entontrado.')
        res.status(200).send({
          message: 'Datos obtenidos correctamente',
          team
        })
      } else {
        console.log('No existe el equipo.')
        errorHelper.notFoundError('No se ha encontrado equipo')
      }
    } catch (err) {
      next(err)
    }
  }

  getUserTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const managerId: number = Number(req.params.userId)
      if (!req.user) {
        return errorHelper.unauthorizedError('No userId provided in Auth')
      }
      const userId: number = req.user?.id as number
      console.log(
        'Buscando equipos del usuario ' + managerId + ' en la base de datos...'
      )
      // search team on DB

      const teams: Team[] = await this.teamService.findByManager(managerId, userId) ?? []
      if (teams) {
        console.log('Equipos de ' + managerId + ' entontrados.')
        // send user
        res.status(200).send({
          message: 'Datos obtenidos correctamente',
          teams
        })
      } else {
        console.log('No existen equipos.')
        errorHelper.notFoundError('No se han encontrado equipos')
      }
    } catch (err) {
      next(err)
    }
  }

  updateTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const team: Team = req.body.team
      console.log(req.body)
      if (!req.user) {
        errorHelper.unauthorizedError('No userId provided in Auth')
      }
      const userId: number = req.user?.id as number
      const id: number = Number(req.params.id)
      try {
        const value: Team = await this.teamService.updateTeam(id, team, userId)
        res.status(200).send({ team: value, message: "Equipo editado correctamente" })
      } catch (err) {
        console.log(err)
        errorHelper.internalServerError('Error al actualizar equipo')
      }
    }
    catch (error) {
      next(error)
    }
  }

  deleteTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = Number(req.params.id)
      if (!id) {
        errorHelper.badRequestError("Falta la id del equipo a borrar")
      }
      if (!req.user) {
        errorHelper.unauthorizedError('No userId provided in Auth')
      }
      const userId: number = req.user?.id as number
      try {
        const value = await this.teamService.deleteTeam(id, userId)
        res.status(200).send({
          team: value,
          message: "Equipo borrado correctamente"
        })
      } catch (err) {
        if (err as CustomError) {
          throw err
        }
        errorHelper.internalServerError('Error al borrar equipo')
      }
    } catch (err) {
      next(err)
    }
  }

  getTeamStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teamId: number = Number(req.params.teamId)
      if (!req.user) {
        errorHelper.unauthorizedError('No userId provided in Auth')
      }
      const userId: number = req.user?.id as number
      try {
        // obtengo competitions, rounds, matches y teams
        const competitionId: number = Number(req.params.competitionId)
        const rounds: Round[] = await this.roundService.findByCompetition(competitionId, userId)
        const matches: Match[] = await this.matchService.findByCompetition(competitionId, userId)
        const teams: Team[] = await this.teamService.findByCompetition(competitionId, userId) ?? []

        // si no hay rounds ni matches devuelve las estadisticas vacias
        if (rounds.length == 0 || matches.length == 0) {
          res.status(200).send({ teamStats: {} })
          return
        }
        // sino recorremos primero todos los rounds
        // y le añadimos los partidos que tengan su roundId
        // y buscamos y guardamos los equipos de cada partido con el id de localteam y awayteam 
        for (const round of rounds) {
          round.matches = matches.filter(match => match.roundId === round.id).map(match => {
            match.localTeam = teams.find(team => team.id === match.localTeamId) || match.localTeam;
            match.awayTeam = teams.find(team => team.id === match.awayTeamId) || match.awayTeam;
            return match;
          });
        }
        // ahora vamos a hace un ranking con los equipos teniendo en
        // cuenta puntos, partidos ganados, goles, etc
        const roundRankings: Round[] = []
        for (let r = 0; r < rounds.length; r++) {
          const roundRanking: Round = rounds[r]
          const updatedTeams: Team[] = []
          // sumar estadisticas de todas las jornadas (para cada equipo)
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
              matches = rounds[j].matches;
              if (matches) {
                for (const match of matches) {
                  const isLocal = match.localTeam?.id === updatedTeam.id;
                  const isAway = match.awayTeam?.id === updatedTeam.id;
                  if (isLocal || isAway) {
                    teamStats.gamesPlayed++;
                    const goalsFor = isLocal ? match.localTeamGoals : match.awayTeamGoals;
                    const goalsAgainst = isLocal ? match.awayTeamGoals : match.localTeamGoals;
                    teamStats.goals += Number(goalsFor);
                    teamStats.goalDif += Number(goalsFor) - Number(goalsAgainst);
                    teamStats.againstGoals += Number(goalsAgainst);
                    if (isLocal) {
                      teamStats.homeGamesPlayed++;
                      teamStats.homeGoals += Number(goalsFor);
                      teamStats.homeGoalDif += Number(goalsFor) - Number(goalsAgainst);
                      teamStats.homeAgainstGoals += Number(goalsAgainst);
                    } else {
                      teamStats.awayGamesPlayed++;
                      teamStats.awayGoals += Number(goalsFor);
                      teamStats.awayGoalDif += Number(goalsFor) - Number(goalsAgainst);
                      teamStats.awayAgainstGoals += Number(goalsAgainst);
                    }
                    if (Number(goalsFor) > Number(goalsAgainst)) {
                      teamStats.points += 3;
                      teamStats.wins++;
                      if (isLocal) {
                        teamStats.homePoints += 3;
                        teamStats.homeWins++;
                      }
                      else {
                        teamStats.awayPoints += 3;
                        teamStats.awayWins++;
                      }
                    } else if (Number(goalsFor) === Number(goalsAgainst)) {
                      teamStats.points++;
                      teamStats.draws++;
                      if (isLocal) {
                        teamStats.homePoints++;
                        teamStats.homeDraws++;
                      }
                      else {
                        teamStats.awayPoints++;
                        teamStats.awayDraws++;
                      }
                    } else {
                      teamStats.loses++;
                      if (isLocal) teamStats.homeLoses++;
                      else teamStats.awayLoses++;
                    }
                    break;
                  }
                }
              }
            }
            updatedTeam.stats = teamStats
            updatedTeams.push(updatedTeam)
          }
          // esto ordena primero por puntos y luego por diferencia de goles
          // Ordena los equipos primero por puntos y luego por otros criterios
          roundRanking.ranking = updatedTeams.sort((b, a) => {
            if (a.stats && b.stats) {
              // Compara los puntos de los equipos
              if (a.stats.points !== b.stats.points) {
                return a.stats.points - b.stats.points;
              } else {
                // Si los puntos son iguales, compara los resultados de los enfrentamientos directos
                const matches = rounds.flatMap(round => round.matches ?? []);
                const duelMatches = matches.filter(
                  match =>
                    (match.localTeam?.id === a.id && match.awayTeam?.id === b.id) ||
                    (match.localTeam?.id === b.id && match.awayTeam?.id === a.id)
                );

                // Calcula los resultados de los enfrentamientos directos
                const duelResults = duelMatches.reduce(
                  (acc, match) => {
                    const isLocal = match.localTeam?.id === a.id;
                    const goalsFor = isLocal ? match.localTeamGoals : match.awayTeamGoals;
                    const goalsAgainst = isLocal ? match.awayTeamGoals : match.localTeamGoals;

                    if (goalsFor > goalsAgainst) acc.aWin++;
                    else if (goalsFor === goalsAgainst) acc.aDraw++;
                    else acc.aLose++;

                    acc.goalDifference += goalsFor - goalsAgainst;
                    return acc;
                  },
                  { aWin: 0, aDraw: 0, aLose: 0, goalDifference: 0 }
                );

                // Si hay dos enfrentamientos directos, decide el orden basado en los resultados
                if (duelMatches.length === 2) {
                  if (duelResults.aWin === 2 || (duelResults.aWin === 1 && duelResults.aDraw === 1)) return 1;
                  if (duelResults.aLose === 2 || (duelResults.aLose === 1 && duelResults.aDraw === 1)) return -1;
                  return duelResults.goalDifference > 0 ? 1 : -1;
                } else if (duelMatches.length === 1) {
                  return duelResults.aWin === 1 ? 1 : -1;
                }

                // Si no hay enfrentamientos directos, compara la diferencia de goles
                return a.stats.goalDif - b.stats.goalDif;
              }
            }
            return 0;
          });
          roundRankings.push(roundRanking)
        }
        
        const team = roundRankings[roundRankings.length - 1]?.ranking?.find((element) => element.id == teamId)
        const position = roundRankings[roundRankings.length - 1]?.ranking?.findIndex((element) => element.id == teamId)
        if (team && team.stats) {
          team.stats.position = Number(position) + 1;
        }
        const teamRanking: TeamRanking = { ...team, position: Number(position) + 1 }
        res.status(200).send({ teamStats: teamRanking })
      } catch (err) {
        console.log("Error en teamStats")
        console.log(err)
        errorHelper.notFoundError('Error al obtener estadísticas del equipo')
      }
    }
    catch (error) {
      next(error)
    }
  }

  getTeamScorers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return errorHelper.unauthorizedError('No userId provided in Auth')
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
            playerName: `${player.firstname} ${player.lastname}`,
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
        pichichiList.sort((a, b) => b.totalGoals - a.totalGoals)
        res.status(200).send({ pichichiList })
      } catch (error) {
        console.log(error)
        errorHelper.internalServerError('No hay jornadas disputadas, por lo que no hay stats')
      }
    }
    catch (error) {
      next(error)
    }
  }


  getTeamCards = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return errorHelper.unauthorizedError('No userId provided in Auth')
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
            playerName: `${player.firstname} ${player.lastname}`,
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
        errorHelper.internalServerError('No hay jornadas disputadas, por lo que no hay stats')
      }
    }
    catch (error) {
      next(error)
    }
  }
}
