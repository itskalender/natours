const { AppError } = require('../utils');

function validate(source, schema) {
  return (req, _, next) => {
    let data;
    
    const isTypeOfSourceEqualToString = typeof source === 'string';
    const isTypeofSourceEqualToArray  = Array.isArray(source) === true;

    if (isTypeOfSourceEqualToString) {
      data = req[source];
    } else if (isTypeofSourceEqualToArray) {
      source.forEach(s => {
        data = { 
          ...data,
          ...req[s]
        };
      });
    }

    const { error, value }  = schema.validate(data);

    if (error) {
      const msg = `${error.details.map(err => err.message).join(', ')}.`;
      
      return next(new AppError(msg, 400));
    }

    next();
  }
}

module.exports = validate;