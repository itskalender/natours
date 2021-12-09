const {
  signUpValidation,
  logInValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  updatePasswordValidation
}                       = require('./auth');
const {
  updateMeValidation,
  updateUserValidation
}                       = require('./user');
const {
  createReviewValidation 
}                       = require('./review');

module.exports = {
  signUpValidation,
  logInValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  updatePasswordValidation,

  updateMeValidation,
  updateUserValidation,

  createReviewValidation
}