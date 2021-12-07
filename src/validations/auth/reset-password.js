const Joi = require('joi');

const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  passwordConfirm: Joi.ref('password'),

  token: Joi.string()
    .required()
})
  .with('password', 'passwordConfirm');

module.exports = resetPasswordSchema;