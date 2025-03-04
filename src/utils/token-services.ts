import jwt from 'jsonwebtoken'
import moment from 'moment'
import {UserDataToken, Token} from '../models/types.js'

process.loadEnvFile()

const SECRET_TOKEN:string = process.env.SECRET_TOKEN || 'secret'

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
  return jwt.sign(payload, SECRET_TOKEN)
}
export function decodeToken(token: string): Promise<UserDataToken> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_TOKEN, (err: jwt.VerifyErrors | null, decoded: jwt.JwtPayload | string | undefined) => {
      if (err) {
        console.log('Token inválido o expirado');
        reject({
          status: 401,
          message: 'Invalid Token',
        });
      }
      else {
        const decodedPayload = decoded as jwt.JwtPayload;
        if (decodedPayload && decodedPayload.exp) {
          if (moment().unix() > decodedPayload.exp) {
            console.log('Token expirado');
            reject({
              status: 401,
              message: 'El token ha expirado',
            });
          } else {
            resolve(Object(decodedPayload.sub));
          }
        } 
        else {
          console.log('Token inválido');
          reject({
            status: 401,
            message: 'Invalid Token',
          });
        }
      }
    });
  });
}