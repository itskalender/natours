const { userService } = require('../services');
const {
  catchAsync
}                     = require('../utils');

const updateMe = catchAsync(async (req, res) => {
  const { user, body }  = req;

  const updatedUser = await userService.update(user.id, body);

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

const deleteMe = catchAsync(async (req, res) => {
  const { user } = req;

  await userService.update(user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

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
  updateMe,
  deleteMe,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}