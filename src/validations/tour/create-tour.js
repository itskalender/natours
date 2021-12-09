const Joi = require('joi');

const createTourValidation = Joi.object({
  name: Joi
    .string()
    .required()
    .trim()
    .min(5)
    .max(25),

  slug: Joi
    .string(),

  duration: Joi
    .number()
    .required(),

  maxGroupSize: Joi
    .number()
    .required()
    .min(5)
    .max(25),

  difficulty: Joi
    .string()
    .required()
    .valid('easy', 'medium', 'difficult'),
  
  price: Joi
    .number()
    .required(),
  
  priceDiscount: Joi
    .number(),
    
  ratingsAverage: Joi
    .number()
    .default(4.5)
    .min(1)
    .max(5),

  ratingsQuantity: Joi
    .number()
    .default(0),

  summary: Joi
    .string()
    .required()
    .trim(),
  
  description: Joi
    .string()
    .trim(),

  imageCover: Joi
    .string()
    .required(),
  
  images: Joi
    .array()
    .items(
      Joi
        .string()
        .required()
    ),
  
  isSecret: Joi
    .boolean()
    .default('false'),

  startDates: Joi
    .array()
    .required()
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
  })
    .required(),
  
  locations: Joi
    .array()
    .required()
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
    .required()
    .items(
      Joi
        .string()
        .required()
    )
});

module.exports = createTourValidation;