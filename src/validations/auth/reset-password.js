const Joi = require('joi');

const resetPasswordValidation = Joi.object({
  password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  passwordConfirm: Joi.ref('password'),
})
  .with('password', 'passwordConfirm');

module.exports = resetPasswordValidation;