const { userService } = require('../services');
const { 
  catchAsync,
  AppError,
  signToken,
  sendEmail
}                     = require('../utils');

const signUp = catchAsync(async (req, res) => {
  const { body } = req;

  const userData = {
    name              : body.name,
    email             : body.email,
    password          : body.password,
    passwordConfirm   : body.passwordConfirm,
    passwordChangedAt : body.passwordChangedAt || undefined,
    role              : body.role
  }
  
  const newUser = await userService.create(userData);
  
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

const sendForgotPasswordEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user      = await userService.findOne({ email });

  if (!user) {
    return next(new AppError('Cannot find a user with this email. Please provide a correct email.', 404));
  }

  const resetToken = user.getPasswordResetTokenForEmail();
  await user.save({ validateBeforeSave: false });

  const resetPasswordLink = `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${resetToken}`;
  const text = `Here is your password reset link.\nPlease perform a patch request with your new password and confirmed password to the link:\n${resetPasswordLink}.`;

  try {
    await sendEmail({
      to: email,
      subject: 'Reset Password (Valid for 10 min)',
      text
    });
  } catch (err) {
    return next(new AppError('There was an error as to sending email.', 500));
  }

  res.status(200).json({
    status: 'success',
    message: 'Email has been sent to your email address.'
  });
});

module.exports = {
  signUp,
  logIn,
  sendForgotPasswordEmail
}