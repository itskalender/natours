const errorHandler            = require('./error-handler');
const createQueryTop5Ratings  = require('./create-query-top-five-ratings');
const verifyAuth              = require('./verify-auth');

module.exports = {
  errorHandler,
  createQueryTop5Ratings,
  verifyAuth
}