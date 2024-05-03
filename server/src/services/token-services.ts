import jwt from 'jsonwebtoken'
import moment from 'moment'
import config from '../config/config.js'
import {UserDataToken, Token} from '../models/types.js'

export function createToken (user: UserDataToken) {
  const userData: UserDataToken = {
    email: user.email,
    id: user.id,
    role: user.role
  }
  const payload: Token = {
    sub: userData,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }
  return jwt.sign(payload, config.SECRET_TOKEN)
  // return jwt.sign(payload, config.SECRET_TOKEN, {expiresIn: "14 days"})
}
export function decodeToken(token: string): Promise<UserDataToken> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.SECRET_TOKEN, (err: jwt.VerifyErrors | null, decodedPayload: any | undefined) => {
      if (decodedPayload) {
        if (moment().unix() > decodedPayload.exp) {
          console.log('Token expirado');
          reject({
            status: 401,
            message: 'El token ha expirado',
          });
        } else {
          console.log('Token válido');
          resolve(decodedPayload.sub);
        }
      } else if (err) {
        console.log('Token inválido');
        reject({
          status: 500,
          message: 'Invalid Token',
        });
      }
    });
  });
}