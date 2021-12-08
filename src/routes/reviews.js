const router    = require('express').Router({ mergeParams: true });
const {
  verifyAuth,
  validate,
  restrictTo
}               = require('../middlewares');
const {
  createReviewSchema
}               = require('../validations');
const {
  getReviews,
  createReview
}               = require('../controllers/review');

router.route('/')
  .get(
    verifyAuth,
    getReviews
  )
  .post(
    verifyAuth,
    restrictTo('user'),
    validate('body', createReviewSchema),
    createReview
  )

module.exports = router;