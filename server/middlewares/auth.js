'use strict'

const tokenServices = require('../services/token-services')

function isAuth(req, res, next) {
  console.log(req.headers);
  if (!req.headers.authorization) {
    console.log('Sin cabeceras. No autorizado');
    return res.status(403).send({
      message: 'No tienes autorización'
    })
  }
  // extract 'Bearer' from Auth header
  const tokenBearer = req.get("authorization")
  let arr = tokenBearer.split(" ")
  const token = arr[1]
  tokenServices.decodeToken(token)
    .then(response => {
      req.user = response
      console.log('Tiene acceso');
      return res.status(200).send({
        message: 'Tienes acceso'
      })
    })
    .catch(response => {
      console.log('No autorizado. Sin acceso');
      return res.status(response.status).send({
        message: 'No tienes autorización'
      })
    })
}

function checkAuth(req, res, next) {
  console.log("");
  console.log("Comprobando header Authorization");
    if (!req.headers.authorization) {
      console.log("No existe");
      return res.status(401).send({
        message: 'No tienes autorización'
      })
    }
    // extract 'Bearer' from Auth header
    const tokenBearer = req.get("authorization")
    let arr = tokenBearer.split(" ")
    const token = arr[1]
    tokenServices.decodeToken(token)
    .then((response) => {
      if (response) {
        console.log(response);
        console.log("Está autorizado");
        req.user = response
        next()
      }
      else{
        console.log("No está autorizado");
      }
    })
    .catch(reject => {
      console.log("No está autorizado");
      return res.status(401).send({
        message: 'No tienes autorización'
      })
    })
}

module.exports = {
  isAuth,
  checkAuth
}
