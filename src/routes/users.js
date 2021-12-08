const express         = require('express');
const router          = express.Router();
const { 
  validate,
  verifyAuth
}                     = require('../middlewares');
const {
  signUpSchema,
  logInSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updatePasswordSchema,
  updateMeSchema
}                     = require('../validations');
const {
  updateMe,
  deleteMe,
  getUsers,
  getUser,
  createUser,
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
    validate('body', signUpSchema),
    signUp
  )

router.route('/login')
  .post(
    validate('body', logInSchema),
    logIn
  )

router.route('/forgot-password')
  .post(
    validate('body', forgotPasswordSchema),
    sendForgotPasswordEmail
  )

router.route('/reset-password/:token')
  .patch(
    validate(['body', 'params'], resetPasswordSchema),
    resetPassword
  )

router.route('/update-password')
  .patch(
    verifyAuth,
    validate('body', updatePasswordSchema),
    updatePassword
  )

router.route('/update-me')
  .patch(
    verifyAuth,
    validate('body', updateMeSchema),
    updateMe
  )

router.route('/delete-me')
  .delete(
    verifyAuth,
    deleteMe
  )

router.route('/')
  .get(getUsers)
  .post(createUser)

router.route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

module.exports = router;