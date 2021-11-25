const BaseService = require('./base-service');
const { Tour }    = require('../models');

class TourService extends BaseService {

}

module.exports = new TourService(Tour);