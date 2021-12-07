const { AppError } = require('../utils');

function validate(source, schema) {
  return (req, _, next) => {
    const data                = req[source];
    const { error, value }    = schema.validate(data);

    if (error) {
      const msg = `${error.details.map(err => err.message).join(', ')}.`;
      
      return next(new AppError(msg, 400));
    }

    next();
  }
}

module.exports = validate;