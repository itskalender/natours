const { userService } = require('../services');
const {
  catchAsync,
  AppError,
  sanitizeObject
}                     = require('../utils');

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

const updateMe = catchAsync(async (req, res, next) => {
  const { user, body }  = req;

  const hasPasswordRelatedData = body.password || body.passwordConfirm;
  if (hasPasswordRelatedData) {
    return next(new AppError('Please don\'t try to change password via this route. Please use /update-password.', 400));
  }

  const data        = sanitizeObject(body, ['name', 'email']);
  const updatedUser = await userService.update(user.id, data);

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has not been created yet ❗'
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has not been created yet ❗'
  })
}

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has not been created yet ❗'
  })
}

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has not been created yet ❗'
  })
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe
}