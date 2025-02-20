'use strict'

import * as tokenServices from '../utils/token-services.js'
import { Request, Response, NextFunction } from 'express'
import { UserDataToken } from '../models/types.js'
import errorHelper from '../utils/errorHelper.js';

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      console.log('Sin cabeceras. No autorizado');
      errorHelper.unauthorizedError('No tienes autorización')
    }

    // Extract 'Bearer' from Auth header
    const tokenBearer: string = req.get('authorization')!; // Use non-null assertion for clarity

    const parts = tokenBearer.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      console.log('Formato de token invalido');
      errorHelper.unauthorizedError('Formato de token invalido');
    }

    const token: string = parts[1];


    const decodedToken: UserDataToken = await tokenServices.decodeToken(token);
    req.user = decodedToken;
    console.log('Tiene acceso');
    return res.status(200).send({ message: 'Tienes acceso' });
  } catch (error) {
    console.log('No autorizado. Sin acceso');
    next(error)
    // errorHelper.unauthorizedError('No tienes autorización')
  }
}

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      console.log('No existe');
      errorHelper.unauthorizedError('No has enviado token')
    }

    const tokenBearer: string = req.get('authorization')!; // Use non-null assertion for clarity

    const parts = tokenBearer.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      console.log('Formato de token invalido');
      errorHelper.unauthorizedError('Formato de token inválido')
    }

    const token: string = parts[1];

    try {
      const decodedToken: UserDataToken = await tokenServices.decodeToken(token);
      req.user = decodedToken;
      console.log('Está autorizado');
      next();
    }
    catch (error: unknown) {
      errorHelper.unauthorizedError((error as Error).message)
    }
  } catch (error) {
    console.log('No está autorizado');
    //errorHelper.unauthorizedError('No tienes autorización')
    next(error)
  }
}

const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      console.log('No existe');
      errorHelper.unauthorizedError('No tienes autorización como administrador')
    }

    // Extract 'Bearer' from Auth header
    const tokenBearer: string = req.get('authorization')!; // Use non-null assertion for clarity

    const parts = tokenBearer.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      console.log('Formato de token invalido');
      errorHelper.unauthorizedError('Formato de token inválido')
    }

    const token: string = parts[1];

    const decodedToken: UserDataToken = await tokenServices.decodeToken(token);
    if (decodedToken && decodedToken.role === 'admin') {
      req.user = decodedToken;
      console.log('Está autorizado como administrador');
      next();
    } else {
      errorHelper.unauthorizedError('No tienes autorización como administrador')
    }
  } catch (error) {
    console.log('No está autorizado');
    next(error);
    // errorHelper.unauthorizedError('No tienes autorización como administrador')
  }
}

export default {
  isAuth,
  checkAuth,
  checkAdmin
}
