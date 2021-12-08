const crypto          = require('crypto');
const { userService } = require('../services');
const { 
  catchAsync,
  AppError,
  signToken,
  sendEmail,
  setJWTCookie
}                     = require('../utils');

const signUp = catchAsync(async (req, res) => {
  const { body }  = req;
  const user      = await userService.create(body);

  user.password = undefined;
  user.active   = undefined;

  const JWT = signToken(user._id);
  setJWTCookie(res, JWT);

  res.status(201).json({
    status: 'success',
    token: JWT,
    data: {
      user
    }
  });
});

const logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userService.findOne({ email }, '+password');

  if ( !user || !(await user.comparePasswords(password, user.password)) ) {
    return next(new AppError('User or password is wrong. Please provide correct information.', 400));
  }

  const JWT = signToken(user._id);
  setJWTCookie(res, JWT);

  res.status(200).json({
    status: 'success',
    token: JWT,
    data: {
      user
    }
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
  const { token: passwordResetToken } = req.params;
  const {
    password,
    passwordConfirm
  }                                   = req.body;
  
  const hashedPasswordResetToken = crypto
    .createHash('sha256')
    .update(passwordResetToken)
    .digest('hex');

  const user = await userService.findOne({
    passwordResetToken: hashedPasswordResetToken,
    passwordResetTokenExpiresAt: { $gte: Date.now() }
  });

  if (!user) {
    return next(new AppError('Invalid or expired token.', 400));
  }

  user.password                     = password;
  user.passwordConfirm              = passwordConfirm;
  user.passwordResetToken           = undefined;
  user.passwordResetTokenExpiresAt  = undefined;

  await user.save({ validateBeforeSave: true });

  const JWT = signToken(user._id);
  setJWTCookie(res, JWT);

  res.status(201).json({
    status: 'success',
    token: JWT,
    data: {
      user
    }
  });
});

const updatePassword = catchAsync(async (req, res, next) => {
  const { id }  = req.user;
  const {
    currentPassword,
    password,
    passwordConfirm
  }             = req.body;

  const user                    = await userService.findOne({ _id: id}, '+password');
  const isCurrentPasswordEqual  = await user.comparePasswords(currentPassword, user.password);

  if (!isCurrentPasswordEqual) {
    return next(new AppError('Your current password is not correct. Please provide a correct password.', 400));
  }

  user.password        = password;
  user.passwordConfirm = passwordConfirm;

  await user.save({ validateBeforeSave: true });

  const JWT = signToken(user._id);
  setJWTCookie(res, JWT);
  
  res.status(200).json({
    status: 'success',
    token: JWT,
    data: {
      user
    }
  });
});

module.exports = {
  signUp,
  logIn,
  sendForgotPasswordEmail,
  resetPassword,
  updatePassword
}