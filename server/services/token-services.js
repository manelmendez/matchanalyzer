'use strict'

const jwt = require('jsonwebtoken')
const moment = require('moment')
const config = require('../config/config')

function createToken(user) {
  const userData = {
    email: user.email,
    id: user.id
  }
  const payload = {
    sub: userData,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }
  return jwt.sign(payload, config.SECRET_TOKEN)
  // return jwt.sign(payload, config.SECRET_TOKEN, {expiresIn: "14 days"})
}

function decodeToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.SECRET_TOKEN, (err, payload) => {
      if (payload) {
        if (payload.exp <= moment().unix()) {
          console.log("Token expirado")
          reject({
            status: 401,
            message: 'El token ha expirado'
          })
        }
        else{
          console.log("Token válido")
          resolve(payload.sub)
        }
      }
      if (err) {
        console.log("Token inválido")
        reject({
          status: 500,
          message: 'Invalid Token'
        })
      }
    })
  })
}

module.exports = {
  createToken,
  decodeToken
}
