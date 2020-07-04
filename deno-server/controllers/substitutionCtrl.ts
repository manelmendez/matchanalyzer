import * as substitutionService from '../dao/substitution-service.ts';

async function addSubstitution(req: any, res: any) {
  let userId = req.user.id;
  let substitutionToSave = {
    minute: req.body.minute,
    playerIn: req.body.playerIn,
    playerOut: req.body.playerOut,
    matchId: req.body.matchId,
    matchpart: req.body.matchpartId,
    userId: userId
  };
  try {
    let substitutionSaved = await substitutionService.saveSubstitution(substitutionToSave);
    return res.status(200).send({
      substitutionSaved: substitutionSaved
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Error al añadir sustitucion: ${error}`
    });
  }
}

async function getSubstitutionsByMatchId(req: any, res: any) {
  let userId = req.user.id;
  let matchId = req.params.matchId;
  try {
    let substitutions = await substitutionService.findByMatch(matchId, userId);
    return res.status(200).send({
      substitutions: substitutions
    });
  } catch (error) {
    return res.status(500).send({
      message: `Error al obtener sustitucion: ${error}`
    });
  }  
}

async function deleteSubstitution(req: any, res: any) {
  let userId = req.user.id;
  let substitutionId = req.params.substitutionId;
  try {
    let substitutionDeleted = await substitutionService.deleteSubstitution(substitutionId, userId);
    return res.status(200).send({
      substitutionDeleted: substitutionDeleted
    }); 
  }
  catch (error) {
    return res.status(500).send({
      message: `Error al borrar sustitucion: ${error}`
    });
  }
}

export default {
  addSubstitution,
  getSubstitutionsByMatchId,
  deleteSubstitution
};
