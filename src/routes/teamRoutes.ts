import { Router } from 'express'
import { TeamController } from '../controllers/teamCtrl.js'
import { TeamService } from '../dao-postgres/team-service.js'
import { RoundService } from '../dao-postgres/round-service.js'
import { MatchService } from '../dao-postgres/match-service.js'
import { GoalService } from '../dao-postgres/goal-service.js'
import { CardService } from '../dao-postgres/card-service.js'
import { PlayerService } from '../dao-postgres/player-service.js'
import auth from '../middlewares/auth.js'

export const teamRouter = (teamService: TeamService, roundService: RoundService, matchService: MatchService, goalService: GoalService, cardService: CardService, playerService: PlayerService) => {
  const teamRouter = Router()

  const teamCtrl = new TeamController(teamService, roundService, matchService, goalService, cardService, playerService)

  teamRouter.post('/teams', auth.checkAuth, teamCtrl.addTeam)
  teamRouter.get('/teams/:id', auth.checkAuth, teamCtrl.getTeam)
  teamRouter.get('/teams/user/:userId', auth.checkAuth, teamCtrl.getUserTeams)
  teamRouter.post('/teams/no-manager', auth.checkAuth, teamCtrl.addNoManagerTeam)
  teamRouter.put('/teams/:id', auth.checkAuth, teamCtrl.updateTeam)
  teamRouter.delete('/teams/:id', auth.checkAuth, teamCtrl.deleteTeam) // PENSAR EN SI BORRAR O NO LAS ESTADISTICAS DEL EQUIPO
  teamRouter.get('/teams/:teamId/competition/:competitionId', auth.checkAuth, teamCtrl.getTeamStats)
  teamRouter.get('/teams/:id/competition/:competitionId/pichihi', auth.checkAuth, teamCtrl.getTeamScorers)
  teamRouter.get('/teams/:id/competition/:competitionId/cards', auth.checkAuth, teamCtrl.getTeamCards)

  return teamRouter
}
