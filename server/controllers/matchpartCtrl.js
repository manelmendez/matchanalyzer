const matchpartService = require('../dao/matchpart-service')

async function addMatchpart(req, res) {
  let userId = req.user.id
  let matchpartToSave = {
    matchId: req.body.matchId,
    formation: req.body.formation,
    time: req.body.time,
    team: req.body.team,
    userId: userId
  }
  let savedPart = await matchpartService.saveMatchpart(matchpartToSave)
  if (savedPart) {
    return res.status(200).send({
      savedPart: savedPart
    })  
  }
  else {
    return res.status(500).send({
      message: `Error al añadir partes`
    })
  }
}

async function getMatchpartsByMatchId(req, res) {
  let userId = req.user.id
  let matchId = req.params.matchId
  let matchParts = await matchpartService.findByMatch(matchId, userId)
  if (matchParts) {
    return res.status(200).send({
      matchParts: matchParts
    })  
  } else {
    return res.status(500).send({
      message: `Error al obtener partes`
    })
  }  
}

async function deleteMatchpart(req, res) {
  let userId = req.user.id
  let matchpartId = req.params.matchpartId
  try {
    let matchpartDeleted = await matchpartService.deleteMatchpart(matchpartId, userId)
    return res.status(200).send({
      matchpartDeleted: matchpartDeleted
    }) 
  }
  catch (error) {
    return res.status(500).send({
      message: `Error al borrar parte: ${error}`
    })
  }
}
module.exports = {
  addMatchpart,
  getMatchpartsByMatchId,
  deleteMatchpart
}
