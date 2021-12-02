const jwt = require('jsonwebtoken');

function signToken(id) {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN}
  );
}

module.exports = signToken;