const Joi                   = require('joi');
const { validations }       = require('../config');
const { VALID_EMAIL_TLDS }  = validations;

const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: VALID_EMAIL_TLDS } })
    .lowercase(),

});

module.exports = forgotPasswordSchema;