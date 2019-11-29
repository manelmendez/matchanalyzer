// 'use strict'

// const TeamStats = require('../models/teamStats.js')
// const teamStatsService = require('../dao/teamStats-service')

// function addTeamStats(req, res, next) {
//   const localTeamStats = new TeamStats({
//     ...req.localTeamStats,
//   })
//   const awayTeamStats = new TeamStats({
//     ...req.awayTeamStats,
//   })
//   console.log("Guardando stats...")
//   teamStatsService.saveTeamStats(localTeamStats).then((stats) => {
//     console.log("Local stats guardadas");
//     teamStatsService.saveTeamStats(awayTeamStats).then((stats2) => {
//       console.log("Away stats guardadas");
//       req.match = req.match
//       req.round = req.round
//       req.localTeamStats = stats
//       req.awayTeamStats = stats2
//       next()
//     }).catch((err) => {
//       return res.status(500).send({
//         message: `Error al guardar local stats: ${err}`
//       })
//     })
//   }).catch((err) => {
//     return res.status(500).send({
//       message: `Error al guardar local stats: ${err}`
//     })
//   })
// }

// function updateTeamStats (req, res) {
//   let localTeamStats = req.localTeamStats
//   let awayTeamStats = req.awayTeamStats
//   const localId= req.localTeamStats._id
//   const awayId= req.awayTeamStats._id

//   delete localTeamStats._id;
//   delete awayTeamStats._id;

//   console.log(localId);
//   console.log(awayId);
//   console.log("Actualizar stats...")
//   // para los dos equipos, 2 parametros? 2 peticiones?
//   teamStatsService.updateTeamStats(localId, localTeamStats)
//   .then((value) => {
//     console.log(value);
//     teamStatsService.updateTeamStats(awayId, awayTeamStats)
//     .then((value2) => {
//       console.log(value2);
//       let data = {
//         match: req.match,
//         localTeamStats: value,
//         awayTeamStats: value2
//       }
//       res.status(200).send(data)
//     })
//     .catch((err2) => {
//       console.log(err2);
//       res.status(500).send({message: `Error al actualizar team stats: ${err2}`})
//     })
//   })
//   .catch((err) => {
//     console.log(err);
//     res.status(500).send({message: `Error al actualizar team stats: ${err}`})
//   })
// }

// function deleteMatchTeamStats (req, res, next) {
//   console.log(req.body);
//   console.log(req.body.localTeamStatsId);
//   teamStatsService.deleteMatchTeamStats(req.body.localTeamStatsId,req.body.awayTeamStatsId)
//   .then((value) => {
//     console.log("Paso 2 - Eliminar stats de lista de teamStats");
//     console.log(value);
//     next()
//   })
//   .catch((err) => {
//     console.log(err);
//     res.status(500).send({message: `Error al borrar team stats: ${err}`})
//   })
// }

// function deleteAllTeamStatsOfRound(req, res, next) {
//   console.log(req.params.id);
//   teamStatsService.findByRoundId(req.params.id)
//   .then((value) => {    
//     let deletedTeamStats = value
//     TeamStats.deleteMany({round: req.params.id})
//     .then((value2) => {
//       req.deletedTeamStats = deletedTeamStats
//       console.log(value2);
//       next()
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send({message: `Error al borrar team stats de jornada: ${err}`})
//     })
//   })
//   .catch((err)=>{
//     res.status(500).send({message: `Error al buscar team stats de jornada: ${err}`})
//   })
// }

// module.exports = {
//   addTeamStats,
//   updateTeamStats,
//   deleteMatchTeamStats,
//   deleteAllTeamStatsOfRound
// }
