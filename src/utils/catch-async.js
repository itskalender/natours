function catchAsync(requestHandler) {
  return function(req, res, next) {
    requestHandler(req, res, next)
      .catch(next);
  }
}

module.exports = catchAsync;