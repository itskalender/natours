const Joi                   = require('joi');
const { validations }       = require('../config');
const { VALID_EMAIL_TLDS }  = validations;

const logInSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: VALID_EMAIL_TLDS } })
    .lowercase(),

  password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});

module.exports = logInSchema;