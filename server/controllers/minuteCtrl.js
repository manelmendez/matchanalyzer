import minuteService from '../dao/minute-service.js'

async function addMinute(req, res) {
  let userId = req.user.id;
  let minute = {
    player: req.body.playerId,
    position: req.body.position,
    matchpart: req.body.matchpartId,
    matchId: req.body.matchId,
    userId: userId
  };
  try {
    let minuteSaved = await minuteService.saveMinute(minute);
    return res.status(200).send({
      minuteSaved: minuteSaved
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Error al añadir partes: ${error}`
    });
  }
}

async function getMinutesByMatchId(req, res) {
  let userId = req.user.id;
  let matchId = req.params.matchId;
  try {
    let minutes = await minuteService.findByMatch(matchId, userId);
    return res.status(200).send({
      minutes: minutes
    });  
  } catch (error) {
    return res.status(500).send({
      message: `Error al obtener partes: ${error}`
    });
  }  
}

async function deleteMinute(req, res) {
  let userId = req.user.id;
  let minuteId = req.params.minuteId;
  try {
    let minuteDeleted = await minuteService.deleteMinute(minuteId, userId);
    return res.status(200).send({
      minuteDeleted: minuteDeleted
    }); 
  }
  catch (error) {
    return res.status(500).send({
      message: `Error al obtener partes: ${error}`
    });
  }
}

export default {
  addMinute,
  getMinutesByMatchId,
  deleteMinute
}