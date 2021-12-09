const express         = require('express');
const router          = express.Router();
const { 
  verifyAuth,
  setAuthIdToParam,
  validate,
  restrictTo,
}                     = require('../middlewares');
const {
  signUpValidation,
  logInValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  updatePasswordValidation,
  updateMeValidation,
  updateUserValidation
}                     = require('../validations');
const {
  getMe,
  updateMe,
  deleteMe,
  getUsers,
  getUser,
  updateUser,
  deleteUser
}                     = require('../controllers/users');
const {
  signUp,
  logIn,
  sendForgotPasswordEmail,
  resetPassword,
  updatePassword
}                     = require('../controllers/auth');

router.route('/signup')
  .post(
    validate('body', signUpValidation),
    signUp
  )

router.route('/login')
  .post(
    validate('body', logInValidation),
    logIn
  )

router.route('/forgot-password')
  .post(
    validate('body', forgotPasswordValidation),
    sendForgotPasswordEmail
  )

router.route('/reset-password/:token')
  .patch(
    validate(['body', 'params'], resetPasswordValidation),
    resetPassword
  )

router.use(verifyAuth);

router.route('/update-password')
  .patch(
    validate('body', updatePasswordValidation),
    updatePassword
  )

router.route('/me')
  .get(
    setAuthIdToParam,
    getMe
  )

router.route('/update-me')
  .patch(
    validate('body', updateMeValidation),
    updateMe
  )

router.route('/delete-me')
  .delete(deleteMe)

router.use(restrictTo('admin'))

router.route('/')
  .get(getUsers)

router.route('/:id')
  .get(getUser)
  .patch(
    validate('body', updateUserValidation),
    updateUser
  )
  .delete(deleteUser)

module.exports = router;