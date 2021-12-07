const jwt           = require('jsonwebtoken');
const { promisify } = require('util');

function verifyToken(token, secret) {
  return promisify(jwt.verify)(token, secret);
}

module.exports = verifyToken;