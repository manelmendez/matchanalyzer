import matchpartService from '../dao-postgres/matchpart-service.js'

async function addMatchpart(req, res) {
  let userId = req.user.id
  let matchpartToSave = {
    matchId: req.body.matchId,
    formation: req.body.formation,
    time: req.body.time,
    team: req.body.team,
    roundId: req.body.roundId,
    userId: userId
  }
  try {
    const savedPart = await matchpartService.saveMatchpart(matchpartToSave)
    if (savedPart) {
      return res.status(200).send({
        savedPart: savedPart
      })
    } else {
      return res.status(500).send({
        message: `Error al añadir partes`
      })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Error al añadir partes`
    })
  }
}

async function getMatchpartsByMatchId(req, res) {
  let userId = req.user.id
  let matchId = req.params.matchId
  try {
    const matchParts = await matchpartService.findByMatch(matchId, userId)
    if (matchParts) {
      return res.status(200).send({
        matchParts: matchParts
      })
    } else {
      return res.status(500).send({
        message: `Error al obtener partes`
      })
    }
  } catch (error) {
    return res.status(500).send({
      message: `Error al obtener partes ${error}`
    })
  }
}

async function deleteMatchpart(req, res) {
  let userId = req.user.id
  let matchpartId = req.params.matchpartId
  try {
    const matchpartDeleted = await matchpartService.deleteMatchpart(
      matchpartId,
      userId
    )
    return res.status(200).send({
      matchpartDeleted: matchpartDeleted
    })
  } catch (error) {
    return res.status(500).send({
      message: `Error al borrar parte: ${error}`
    })
  }
}
export default {
  addMatchpart,
  getMatchpartsByMatchId,
  deleteMatchpart
}
