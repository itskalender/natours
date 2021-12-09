const router    = require('express').Router({ mergeParams: true });
const {
  verifyAuth,
  validate,
  restrictTo,
  setBodyTourAndUserIds
}               = require('../middlewares');
const {
  createReviewValidation,
  updateReviewValidation
}               = require('../validations');
const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview
}               = require('../controllers/reviews');

router.use(verifyAuth);

router.route('/')
  .get(
    getReviews
  )
  .post(
    restrictTo('user'),
    setBodyTourAndUserIds,
    validate('body', createReviewValidation),
    createReview
  )

router.route('/:id')
  .get(
    getReview
  )
  .patch(
    restrictTo('user', 'admin'),
    validate('body', updateReviewValidation),
    updateReview
  )
  .delete(
    restrictTo('user', 'admin'),
    deleteReview
  )

module.exports = router;