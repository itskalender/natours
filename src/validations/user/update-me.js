const Joi                   = require('joi');
const { validations }       = require('../../config');
const { VALID_EMAIL_TLDS }  = validations;

const updateMeValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: VALID_EMAIL_TLDS } })
    .lowercase(),

  name: Joi.string()
    .trim()
    .min(2)
    .max(20),
});

module.exports = updateMeValidation;