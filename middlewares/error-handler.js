const environment = process.env.NODE_ENV;

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

function errorHandler(err, req, res, next) {
  if (environment === 'development') {
    sendDevError(err, res);
  } else if (environment === 'production') {
    sendProdError(err, res);
  }
}

module.exports = {
  errorHandler
}