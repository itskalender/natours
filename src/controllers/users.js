const { 
  updateOne,
  deleteOne
}                     = require('./base');
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

const getUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await userService.findById(id);

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

const updateUser = updateOne(userService);

const deleteUser = deleteOne(userService);

module.exports = {
  updateMe,
  deleteMe,
  getUsers,
  getUser,
  updateUser,
  deleteUser
}