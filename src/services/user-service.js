const BaseService = require('./base-service');
const { User }    = require('../models');

class UserService extends BaseService {

}

module.exports = new UserService(User);