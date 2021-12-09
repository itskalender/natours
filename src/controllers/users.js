const {
  getAll,
  getOne,
  updateOne,
  deleteOne
}                     = require('./base');
const { userService } = require('../services');
const {
  catchAsync
}                     = require('../utils');

const getUsers    = getAll(userService);
const getUser     = getOne(userService);
const updateUser  = updateOne(userService);
const deleteUser  = deleteOne(userService);

const getMe       = getOne(userService);

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

module.exports = {
  getMe,
  updateMe,
  deleteMe,
  getUsers,
  getUser,
  updateUser,
  deleteUser
}