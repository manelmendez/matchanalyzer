'use strict'

import tokenServices from '../services/token-services.js'

function isAuth(req, res) {
  if (!req.headers.authorization) {
    console.log('Sin cabeceras. No autorizado')
    return res.status(403).send({
      message: 'No tienes autorización'
    })
  }
  // extract 'Bearer' from Auth header
  const tokenBearer = req.get('authorization')
  let arr = tokenBearer.split(' ')
  const token = arr[1]
  tokenServices
    .decodeToken(token)
    .then((response) => {
      req.user = response
      console.log('Tiene acceso')
      return res.status(200).send({
        message: 'Tienes acceso'
      })
    })
    .catch((response) => {
      console.log('No autorizado. Sin acceso')
      return res.status(response.status).send({
        message: 'No tienes autorización'
      })
    })
}

function checkAuth(req, res, next) {
  console.log('')
  console.log('Comprobando header Authorization')
  if (!req.headers.authorization) {
    console.log('No existe')
    return res.status(401).send({
      message: 'No tienes autorización'
    })
  }
  // extract 'Bearer' from Auth header
  const tokenBearer = req.get('authorization')
  let arr = tokenBearer.split(' ')
  const token = arr[1]
  tokenServices
    .decodeToken(token)
    .then((response) => {
      if (response) {
        console.log('Está autorizado')
        req.user = response
        next()
      } else {
        console.log('No está autorizado')
      }
    })
    .catch((error) => {
      console.log('No está autorizado')
      console.log(error)
      return res.status(401).send({
        message: 'No tienes autorización'
      })
    })
}

function checkAdmin(req, res, next) {
  console.log('')
  console.log('Comprobando header Authorization')
  if (!req.headers.authorization) {
    console.log('No existe')
    return res.status(401).send({
      message: 'No tienes autorización como administrador'
    })
  }
  // extract 'Bearer' from Auth header
  const tokenBearer = req.get('authorization')
  let arr = tokenBearer.split(' ')
  const token = arr[1]
  tokenServices
    .decodeToken(token)
    .then((response) => {
      if (response && response.role == 'admin') {
        console.log('Está autorizado como administrador')
        req.user = response
        next()
      } else {
        throw 'No está autorizado como administrador'
      }
    })
    .catch((error) => {
      console.log(error)
      return res.status(401).send({
        message: 'No tienes autorización como administrador'
      })
    })
}

export default {
  isAuth,
  checkAuth,
  checkAdmin
}
