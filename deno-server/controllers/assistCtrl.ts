import * as assistService from '../dao/assist-service.ts';

async function addAssist(req: any, res: any) {
  let userId = req.user.id;
  let assistToSave = {
    goal: req.body.goal,
    type: req.body.type,
    player: req.body.playerId,
    matchId: req.body.match,
    matchpart: req.body.matchpartId,
    userId: userId,
  };
  try {
    let assistSaved = await assistService.saveAssist(assistToSave);
    return res.status(200).send({
      assistSaved: assistSaved
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Error al añadir asistencia: ${error}`
    });
  }
}

async function getAssistsByMatchId(req: any, res: any) {
  let userId = req.user.id;
  let matchId = req.params.matchId;
  try {
    let assists = await assistService.findByMatch(matchId, userId);
    return res.status(200).send({
      assists: assists
    });
  } catch (error) {
    return res.status(500).send({
      message: `Error al obtener asistencia: ${error}`
    });
  }  
}

async function deleteAssist(req: any, res: any) {
  let userId = req.user.id;
  let assistId = req.params.assistId;
  try {
    let assistDeleted = await assistService.deleteAssist(assistId, userId);
    return res.status(200).send({
      assistDeleted: assistDeleted
    }); 
  }
  catch (error) {
    return res.status(500).send({
      message: `Error al borrar asistencia: ${error}`
    });
  }
}

export default {
  addAssist,
  getAssistsByMatchId,
  deleteAssist
}
