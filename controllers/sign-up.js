const { userService } = require('../services');
const { catchAsync }  = require('../utils');

const signUp = catchAsync(async (req, res) => {
  const { body: userData } = req;

  const newUser = await userService.create(userData);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
});

module.exports = {
  signUp
}