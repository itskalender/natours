function errorHandler(err, req, res, next) {

  if (!err.isOperational) {
    err.statusCode  = 500;
    err.status      = 'error';
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
}

module.exports = {
  errorHandler
}