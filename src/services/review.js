const BaseService = require('./base');
const { Review }  = require('../models');

class ReviewService extends BaseService {

}

module.exports = new ReviewService(Review);