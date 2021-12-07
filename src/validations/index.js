const signUpSchema          = require('./sign-up');
const logInSchema           = require('./log-in');
const forgotPasswordSchema  = require('./forgot-password');
const resetPasswordSchema   = require('./reset-password');

module.exports = {
  signUpSchema,
  logInSchema,
  forgotPasswordSchema,
  resetPasswordSchema
}