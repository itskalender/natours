class AppError extends Error {
  constructor(errorMsg, statusCode) {
    super(errorMsg);

    this.statusCode     = statusCode;
    this.status         = String(statusCode).startsWith('4') ? 'fail' : 'error'; 
    this.isOperational  = true;
  }
}

module.exports = AppError;