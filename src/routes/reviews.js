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
  createReview,
  deleteReview
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

router.route('/:id')
  .delete(deleteReview)

module.exports = router;