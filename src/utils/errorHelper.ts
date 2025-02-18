export interface CustomError extends Error {
  code?: string;
  httpStatus?: number;
}

const conflictError = (msg: string, code = 'CONFLICT') => {
  const err: CustomError = {name: 'ConflictError', message: msg, code, httpStatus:409}
  throw err;
}

const notFoundError = (msg: string, code = 'NOT_FOUND') => {
  const err: CustomError = {name: 'NotFoundError', message: msg, code, httpStatus:404}
  throw err;
}

const unauthorizedError = (msg: string, code = 'UNAUTHORIZED') => {
  const err: CustomError = {name: 'UnauthorizedError', message: msg, code, httpStatus:401}
  throw err;
}

const forbiddenError = (msg: string, code = 'FORBIDDEN') => {
  const err: CustomError = {name: 'ForbiddenError', message: msg, code, httpStatus:403}
  throw err;
}

const badRequestError = (msg: string, code = 'BAD_REQUEST') => {
  const err: CustomError = {name: 'BadRequestError', message: msg, code, httpStatus:400}
  throw err;
}

const internalServerError = (msg: string, code = 'INTERNAL_ERROR') => {
  const err: CustomError = {name: 'InternalServerError', message: msg, code, httpStatus:500}
  throw err;
}

export default {
  conflictError,
  notFoundError,
  unauthorizedError,
  forbiddenError,
  badRequestError,
  internalServerError
}