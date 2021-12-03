const crypto          = require('crypto');
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
  
  const JWT = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token: JWT,
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

  const JWT = signToken();

  res.status(200).json({
    status: 'success',
    token: JWT
  });
});

const sendForgotPasswordEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user      = await userService.findOne({ email });

  if (!user) {
    return next(new AppError('Cannot find a user with this email. Please provide a correct email.', 404));
  }

  const passwordResetToken = user.getPasswordResetTokenForEmail();
  await user.save({ validateBeforeSave: false });

  const passwordResetLink = `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${passwordResetToken}`;
  const text = `Here is your password reset link.\nPlease perform a patch request with your new password and confirmed password to the link:\n${passwordResetLink}.`;

  try {
    await sendEmail({
      to: email,
      subject: 'Reset Password (Valid for 10 min)',
      text
    });
  } catch (err) {
    user.passwordResetToken           = undefined;
    user.passwordResetTokenExpiresAt  = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new AppError('There was an error as to sending email.', 500));
  }

  res.status(200).json({
    status: 'success',
    message: 'Email has been sent to your email address.'
  });
});

const resetPassword = catchAsync(async (req, res, next) => {
  const { token: passwordResetToken }   = req.params;
  const {
    password,
    passwordConfirm
  }                 = req.body;
  
  // 1 - First check if token is existent... 
  if (!passwordResetToken) {
    return next(new AppError('Please provide a token.', 400));
  }

  // 2 - Hash token
  const hashedPasswordResetToken = crypto
    .createHash('sha256')
    .update(passwordResetToken)
    .digest('hex');

  // 3 - Find User
  const user = await userService.findOne({
    passwordResetToken: hashedPasswordResetToken,
    passwordResetTokenExpiresAt: { $gte: Date.now() }
  });

  if (!user) {
    return next(new AppError('Invalid or expired token.', 400));
  }

  // Update password....
  user.password         = password;
  user.passwordConfirm  = passwordConfirm;
  await user.save({ validateBeforeSave: true });

  // Login user
  const JWT = signToken(user._id);

  res.status(201).json({
    status: 'success',
    token: JWT,
  });
});

module.exports = {
  signUp,
  logIn,
  sendForgotPasswordEmail,
  resetPassword
}