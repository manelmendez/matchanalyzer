import { Router } from 'express'
import { SubstitutionController } from '../controllers/substitutionCtrl.js'
import { SubstitutionService } from '../dao-postgres/substitution-service.js'
import auth from '../middlewares/auth.js'

export const substitutionRouter = (substituionService: SubstitutionService) => {
  const substitutionRouter = Router()

  const substitutionCtrl = new SubstitutionController(substituionService)

  substitutionRouter.get('/substitutions/match/:matchId', auth.checkAuth, substitutionCtrl.getSubstitutionsByMatchId)
  substitutionRouter.post('/substitutions', auth.checkAuth, substitutionCtrl.addSubstitution)
  substitutionRouter.delete('/substitutions/:substitutionId', auth.checkAuth, substitutionCtrl.deleteSubstitution)

  return substitutionRouter
}
