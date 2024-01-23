import substitutionService from '../dao-postgres/substitution-service.js'

const addSubstitution = async (req, res) => {
  let userId = req.user.id
  let substitutionToSave = {
    minute: req.body.minute,
    playerIn: req.body.playerIn,
    playerOut: req.body.playerOut,
    matchId: req.body.matchId,
    matchpart: req.body.matchpartId,
    roundId: req.body.roundId,
    userId: userId
  }
  try {
    const substitutionSaved =
      await substitutionService.saveSubstitution(substitutionToSave)
    return res.status(200).send({
      substitutionSaved: substitutionSaved
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: `Error al añadir sustitucion: ${error}`
    })
  }
}

const getSubstitutionsByMatchId = async (req, res) => {
  let userId = req.user.id
  let matchId = req.params.matchId
  try {
    const substitutions = await substitutionService.findByMatch(matchId, userId)
    return res.status(200).send({
      substitutions: substitutions
    })
  } catch (error) {
    return res.status(500).send({
      message: `Error al obtener sustitucion: ${error}`
    })
  }
}

const deleteSubstitution = async (req, res) => {
  let userId = req.user.id
  let substitutionId = req.params.substitutionId
  try {
    const substitutionDeleted = await substitutionService.deleteSubstitution(
      substitutionId,
      userId
    )
    return res.status(200).send({
      substitutionDeleted: substitutionDeleted
    })
  } catch (error) {
    return res.status(500).send({
      message: `Error al borrar sustitucion: ${error}`
    })
  }
}

export default {
  addSubstitution,
  getSubstitutionsByMatchId,
  deleteSubstitution
}
