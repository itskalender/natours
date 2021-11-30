const { AppError } = require('../utils');

function sendProdError(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong❗'
    });
  }
}

function sendDevError(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      error: err,
      status: err.status,
      message: err.message,
      stack: err.stack
    });
  } else {
    res.status(500).json({
      error: err,
      status: 'error',
      message: err.message,
      stack: err.stack
    });
  }
}

function createDBCastErr(err) {
  const msg = `Invalid ${err.path}: ${err.value}`;

  return new AppError(msg, 400);
}

function createDBDuplicateErr(err) {
  const msg = `Duplicate field for value: ${err.keyValue.name}`;

  return new AppError(msg, 400);
}

function createDBValidationErr(err) {
  const errors  = err.errors;
  const msg     = Object.values(errors).map(err => err.message).join(' ');

  return new AppError(msg, 400);
}

function errorHandler(err, req, res, next) {
  if (process.env.NODE_ENV === 'development') {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV.trim() === 'production') {
    const isCastError         = err.name === 'CastError';
    const isDuplicationError  = err.code === 11000;
    const isValidationError   = /\b(validation)\b/g.test(err._message);
  
    let prodErr = { ...err };

    if (isCastError) {
      prodErr = createDBCastErr(err);
    } else if (isDuplicationError) { 
      prodErr = createDBDuplicateErr(err);
    } else if (isValidationError) {
      prodErr = createDBValidationErr(err);
    }

    sendProdError(prodErr, res);
  }
}

module.exports = {
  errorHandler
}