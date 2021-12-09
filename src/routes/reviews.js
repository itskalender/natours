const router    = require('express').Router({ mergeParams: true });
const {
  verifyAuth,
  validate,
  restrictTo,
  setBodyTourAndUserIds
}               = require('../middlewares');
const {
  createReviewSchema
}               = require('../validations');
const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview
}               = require('../controllers/reviews');

router.route('/')
  .get(
    verifyAuth,
    getReviews
  )
  .post(
    verifyAuth,
    restrictTo('user'),
    setBodyTourAndUserIds,
    validate('body', createReviewSchema),
    createReview
  )

router.route('/:id')
  .get(getReview)
  .patch(updateReview)
  .delete(deleteReview)

module.exports = router;