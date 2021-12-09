const signUpValidation          = require('./sign-up');
const logInValidation           = require('./log-in');
const forgotPasswordValidation  = require('./forgot-password');
const resetPasswordValidation   = require('./reset-password');
const updatePasswordValidation  = require('./update-password');

module.exports = {
  signUpValidation,
  logInValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  updatePasswordValidation
}