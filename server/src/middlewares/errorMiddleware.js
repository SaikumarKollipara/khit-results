import config from "../config/config.js";

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}


export function errorHandler (err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  return res.status(statusCode).json({
    success: false,
    message,
    stack: config.APP_ENV === 'development' ? err.stack : undefined
  })
}