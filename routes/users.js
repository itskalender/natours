const express = require('express');
const router  = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}             = require('../controllers/users');

const {
  signUp,
  logIn,
  sendForgotPasswordEmail,
  resetPassword
}             = require('../controllers/auth');

router.route('/signup')
  .post(signUp)

router.route('/login')
  .post(logIn)

router.route('/forgot-password')
  .post(sendForgotPasswordEmail)

router.route('/reset-password/:token')
  .patch(resetPassword)

router.route('/')
  .get(getUsers)
  .post(createUser)

router.route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

module.exports = router;