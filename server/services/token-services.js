import jwt from 'jsonwebtoken'
import moment from 'moment'
import config from '../config/config.js'

function createToken(user) {
  const userData = {
    email: user.email,
    id: user.id,
    role: user.role
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
          console.log('Token expirado')
          reject({
            status: 401,
            message: 'El token ha expirado'
          })
        } else {
          console.log('Token válido')
          resolve(payload.sub)
        }
      }
      if (err) {
        console.log('Token inválido')
        reject({
          status: 500,
          message: 'Invalid Token'
        })
      }
    })
  })
}

export default {
  createToken,
  decodeToken
}
