const Joi = require('joi');

const updatePasswordValidation = Joi.object({
  currentPassword: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  passwordConfirm: Joi.ref('password'),
})
  .with('password', 'passwordConfirm');

module.exports = updatePasswordValidation;