'use strict';

import { validateJwt } from "https://deno.land/x/djwt/validate.ts"
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts"
import { moment } from '../deps.ts'
import config from "../config/config.ts";

function createToken(user: any) {
  const userData = {
    email: user.email,
    id: user.id,
    role: user.role
  };
  const payload: Payload = {
    sub: JSON.stringify(userData),
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  const header: Jose = {
    alg: "HS256",
    typ: "JWT",
  };
  return makeJwt({header: header, payload: payload, key: config.SECRET_TOKEN});
}

async function decodeToken(token: any) {
  let validatedToken = await validateJwt(token, config.SECRET_TOKEN)
  if (validatedToken.isValid) {
    console.log("Token válido");
    let user = validatedToken.payload?.sub
    return(user);
  }
  else {
    console.log("Token inválido");
    throw Error("Invalid Token");
  }
}

export default{
  createToken,
  decodeToken
}
