const { AppError } = require('../../utils');

function restrictTo(...requiredRoles) {
  return (req, _, next) => {
    const { user }      = req;
    const isUserAllowed = requiredRoles.includes(user.role);

    if (!isUserAllowed) {
      return next(new AppError('You are not allowed to perform this action.', 403));
    }

    next();
  }
}

module.exports = restrictTo;