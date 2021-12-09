const Joi = require('joi');

const createReviewValidation = Joi.object({
  review: Joi.string()
    .required()
    .max(100),
  
  rating: Joi.number()
    .min(1)
    .max(5),
  
  author: Joi.string(),
  
  tour: Joi.string()
});

module.exports = createReviewValidation;