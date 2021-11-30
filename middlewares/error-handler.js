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

function getCastErr(err) {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
}

function errorHandler(err, req, res, next) {
  if (process.env.NODE_ENV === 'development') {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV.trim() === 'production') {
    let prodErr;

    switch (err.name) {
      case 'CastError':
        prodErr = getCastErr(err);
        break;
      default:
        break;
    }
    
    sendProdError(prodErr, res);
  }
}

module.exports = {
  errorHandler
}