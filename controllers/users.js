const { userService } = require('../services');
const {
  catchAsync
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
  deleteUser
}