const Joi = require('joi');

const updateReviewValidation = Joi.object({
  review: Joi
    .string()
    .max(200),
  
  rating: Joi
    .number()
    .min(1)
    .max(5),
  
});

module.exports = updateReviewValidation;