const errorHandler            = require('./error-handler');
const { 
  createQueryTop5Ratings
}                             = require('./tours');
const {
  setAuthIdToParam
}                             = require('./users');
const {
  setBodyTourAndUserIds
}                             = require('./reviews');
const {
  verifyAuth,
  restrictTo
}                             = require('./auth');
const limiter                 = require('./limiter');
const validate                = require('./validate');

module.exports = {
  errorHandler,
  createQueryTop5Ratings,
  setAuthIdToParam,
  setBodyTourAndUserIds,
  verifyAuth,
  restrictTo,
  limiter,
  validate
}