const setEnv      = require('./set-env');
const validations = require('./validations');

function setConfig() {
  setEnv();
}

module.exports = {
  setConfig,
  validations
}