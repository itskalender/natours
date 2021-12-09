const Joi = require('joi');

const updateTourValidation = Joi.object({
  name: Joi
    .string()
    .trim()
    .min(5)
    .max(25),

  slug: Joi
    .string(),

  duration: Joi
    .number(),

  maxGroupSize: Joi
    .number()
    .min(5)
    .max(25),

  difficulty: Joi
    .string()
    .valid('easy', 'medium', 'difficult'),
  
  price: Joi
    .number(),
  
  priceDiscount: Joi
    .number(),
    
  ratingsAverage: Joi
    .number()
    .min(1)
    .max(5),

  ratingsQuantity: Joi
    .number(),

  summary: Joi
    .string()
    .trim(),
  
  description: Joi
    .string()
    .trim(),

  imageCover: Joi
    .string(),
  
  images: Joi
    .array()
    .items(
      Joi
        .string()
        .required()
    ),
  
  isSecret: Joi
    .boolean(),

  startDates: Joi
    .array()
    .items(
      Joi
        .date()
        .required()
    ),

  startLocation: Joi.object({
    type: Joi
      .string()
      .valid('Point')
      .default('Point'),

    coordinates: Joi
      .array()
      .required()
      .items(
        Joi
          .number()
          .required()
      )
      .length(2),

    description: Joi
      .string()
      .required(),

    address: Joi
      .string()
      .required()
  }),
  
  locations: Joi
    .array()
    .items(
      Joi
        .object({
          type: Joi
            .string()
            .valid('Point')
            .default('Point'),

          coordinates: Joi
            .array()
            .required()
            .items(
              Joi
                .number()
                .required()
            )
            .length(2),

          description: Joi
            .string()
            .required(),

          day: Joi
            .number()
            .required()
        })
    ),

  guides: Joi
    .array()
    .items(
      Joi
        .string()
        .required()
    )
});

module.exports = updateTourValidation;