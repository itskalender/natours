const jwt             = require('jsonwebtoken');
const { userService } = require('../services');
const { catchAsync }  = require('../utils');

const signUp = catchAsync(async (req, res) => {
  const { body } = req;

  const userData = {
    name            : body.name,
    email           : body.email,
    password        : body.password,
    passwordConfirm : body.passwordConfirm
  }
  
  const newUser = await userService.create(userData);
  
  /*  What is the difference? I've already MongoDB schema and, unwanted paths will not be saved.
   *  Why are not we good to go with just `body`?
   *  const newUser = await userService.create(body);
   */
 
  const token = jwt.sign(
    { id: newUser._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN}
  );

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

module.exports = {
  signUp
}