const Joi                   = require('joi');
const { validations }       = require('../../config');
const { VALID_EMAIL_TLDS }  = validations;

const signUpSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: VALID_EMAIL_TLDS } })
    .lowercase(),

  password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  passwordConfirm: Joi.ref('password'),

  name: Joi.string()
    .required()
    .trim()
    .min(2)
    .max(20),
  
  role: Joi.string()
    .allow('user', 'guide', 'lead-guide', 'admin')
    .default('user')
})
  .with('password', 'passwordConfirm');

module.exports = signUpSchema;