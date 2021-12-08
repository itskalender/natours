const errorHandler            = require('./error-handler');
const createQueryTop5Ratings  = require('./create-query-top-five-ratings');
const {
  verifyAuth,
  restrictTo
}                             = require('./auth');
const limiter                 = require('./limiter');
const validate                = require('./validate');

module.exports = {
  errorHandler,
  createQueryTop5Ratings,
  verifyAuth,
  restrictTo,
  limiter,
  validate
}