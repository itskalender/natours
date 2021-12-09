const {
  signUpValidation,
  logInValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  updatePasswordValidation
}                           = require('./auth');
const {
  createTourValidation,
  updateTourValidation
}                           = require('./tour');
const {
  updateMeValidation,
  updateUserValidation
}                           = require('./user');
const {
  createReviewValidation 
}                           = require('./review');

module.exports = {
  signUpValidation,
  logInValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  updatePasswordValidation,

  createTourValidation,
  updateTourValidation,

  updateMeValidation,
  updateUserValidation,

  createReviewValidation
}