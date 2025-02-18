import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/errorHelper"

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const errorCtrl = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.httpStatus || 500).json({
    code: err.code || 'INTERNAL_ERROR',
    message: err.message || 'Algo salió mal',
    statusCode: err.httpStatus || 500
  });
}