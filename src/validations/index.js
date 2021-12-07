const {
  signUpSchema,
  logInSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updatePasswordSchema
}                       = require('./auth');

const {
  updateMeSchema
}                       = require('./user');

module.exports = {
  signUpSchema,
  logInSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updatePasswordSchema,

  updateMeSchema
}