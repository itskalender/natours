const jwt             = require('jsonwebtoken');
const { userService } = require('../services');
const { 
  catchAsync,
  AppError
}                     = require('../utils');

function signToken(id) {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN}
  );
}

const signUp = catchAsync(async (req, res) => {
  const { body } = req;

  const userData = {
    name            : body.name,
    email           : body.email,
    password        : body.password,
    passwordConfirm : body.passwordConfirm
  }
  
  const newUser = await userService.create(userData);
  
  /**  What is the difference? I've already MongoDB schema and, unwanted paths will not be saved.
   *  Why are not we good to go with just `body`?
   *  const newUser = await userService.create(body);
   */
 
  const token = signToken();

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

const logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide an email and password.', 400));
  }

  const user = await userService.findOne({ email });

  if ( !user || !(await user.comparePasswords(password, user.password)) ) {
    return next(new AppError('Invalid email or password.', 400));
  }

  const token = signToken();

  res.status(200).json({
    status: 'success',
    token
  });
});

module.exports = {
  signUp,
  logIn
}