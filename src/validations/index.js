const signUpSchema          = require('./sign-up');
const logInSchema           = require('./log-in');
const forgotPasswordSchema  = require('./forgot-password');
const resetPasswordSchema   = require('./reset-password');
const updatePasswordSchema  = require('./update-password');

module.exports = {
  signUpSchema,
  logInSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updatePasswordSchema
}