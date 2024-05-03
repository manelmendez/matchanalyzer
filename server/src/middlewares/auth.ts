'use strict'

import * as tokenServices from '../services/token-services.js'
import { Request, Response, NextFunction } from 'express'
import {UserDataToken, Token} from '../models/types.js'

async function isAuth(req: Request, res: Response): Promise<Response> {
  if (!req.headers.authorization) {
    console.log('Sin cabeceras. No autorizado');
    return res.status(403).send({ message: 'No tienes autorización' });
  }

  // Extract 'Bearer' from Auth header
  const tokenBearer: string = req.get('authorization')!; // Use non-null assertion for clarity

  const parts = tokenBearer.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    console.log('Formato de token invalido');
    return res.status(401).send({ message: 'Formato de token invalido' });
  }

  const token: string = parts[1];

  try {
    const decodedToken: UserDataToken = await tokenServices.decodeToken(token);
    req.user = decodedToken;
    console.log('Tiene acceso');
    return res.status(200).send({ message: 'Tienes acceso' });
  } catch (error: any) {
    console.log('No autorizado. Sin acceso');
    return res.status(error.status || 401).send({ message: 'No tienes autorización' });
  }
}

async function checkAuth(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  console.log('Comprobando header Authorization');
  if (!req.headers.authorization) {
    console.log('No existe');
    return res.status(401).send({ message: 'No tienes autorización' });
  }

  const tokenBearer: string = req.get('authorization')!; // Use non-null assertion for clarity

  const parts = tokenBearer.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    console.log('Formato de token invalido');
    return res.status(401).send({ message: 'Formato de token invalido' });
  }

  const token: string = parts[1];

  try {
    const decodedToken: UserDataToken = await tokenServices.decodeToken(token);
    req.user = decodedToken;
    console.log('Está autorizado');
    next();
  } catch (error: any) {
    console.log('No está autorizado');
    console.error(error); // Use console.error for actual errors
    return res.status(401).send({ message: 'No tienes autorización' });
  }
}

async function checkAdmin(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  console.log('Comprobando header Authorization');
  if (!req.headers.authorization) {
    console.log('No existe');
    return res.status(401).send({ message: 'No tienes autorización como administrador' });
  }

  // Extract 'Bearer' from Auth header
  const tokenBearer: string = req.get('authorization')!; // Use non-null assertion for clarity

  const parts = tokenBearer.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    console.log('Formato de token invalido');
    return res.status(401).send({ message: 'Formato de token invalido' });
  }

  const token: string = parts[1];

  try {
    const decodedToken: UserDataToken = await tokenServices.decodeToken(token);
    if (decodedToken && decodedToken.role === 'admin') {
      req.user = decodedToken;
      console.log('Está autorizado como administrador');
      next();
    } else {
      return res.status(401).send({ message: 'No tienes autorización como administrador' });
    }
  } catch (error: any) {
    console.log('No está autorizado');
    console.error(error); // Use console.error for actual errors
    return res.status(401).send({ message: 'No tienes autorización como administrador' });
  }
}

export default {
  isAuth,
  checkAuth,
  checkAdmin
}
