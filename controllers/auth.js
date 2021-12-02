const { userService } = require('../services');
const { 
  catchAsync,
  AppError,
  signToken
}                     = require('../utils');

const signUp = catchAsync(async (req, res) => {
  const { body } = req;

  const userData = {
    name              : body.name,
    email             : body.email,
    password          : body.password,
    passwordConfirm   : body.passwordConfirm,
    passwordUpdatedAt : body.passwordUpdatedAt || undefined,
  }
  
  const newUser = await userService.create(userData);
  
  /** 
   *  What is the difference? I've already MongoDB schema and, unwanted paths will not be saved.
   *  Why are not we good to go with just `body`?
   *  const newUser = await userService.create(body);
   */
 
  const token = signToken(newUser._id);

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

  const user = await userService.findOne({ email }, '+password');

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