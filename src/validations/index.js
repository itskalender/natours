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
const {
  createReviewSchema 
}                       = require('./review');

module.exports = {
  signUpSchema,
  logInSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updatePasswordSchema,

  updateMeSchema,

  createReviewSchema
}