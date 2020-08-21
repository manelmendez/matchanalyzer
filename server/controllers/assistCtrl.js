import assistService from '../dao-postgres/assist-service.js'

const addAssist = async (req, res) => {
  let userId = req.user.id
  let assistToSave = {
    goal: req.body.goal,
    type: req.body.type,
    player: req.body.playerId,
    matchId: req.body.match,
    matchpart: req.body.matchpartId,
    roundId: req.body.roundId,
    userId: userId
  }
  try {
    const assistSaved = await assistService.saveAssist(assistToSave)
    return res.status(200).send({
      assistSaved: assistSaved
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: `Error al añadir asistencia: ${error}`
    })
  }
}

const getAssistsByMatchId = async (req, res) => {
  let userId = req.user.id
  let matchId = req.params.matchId
  try {
    const assists = await assistService.findByMatch(matchId, userId)
    return res.status(200).send({
      assists: assists
    })
  } catch (error) {
    return res.status(500).send({
      message: `Error al obtener asistencia: ${error}`
    })
  }
}

const deleteAssist = async (req, res) => {
  let userId = req.user.id
  let assistId = req.params.assistId
  try {
    const assistDeleted = await assistService.deleteAssist(assistId, userId)
    return res.status(200).send({
      assistDeleted: assistDeleted
    })
  } catch (error) {
    return res.status(500).send({
      message: `Error al borrar asistencia: ${error}`
    })
  }
}

export default {
  addAssist,
  getAssistsByMatchId,
  deleteAssist
}
