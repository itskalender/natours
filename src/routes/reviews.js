const router    = require('express').Router();
const {
  verifyAuth,
  validate
}               = require('../middlewares');
const {
  createReviewSchema
}               = require('../validations');
const {
  getReviews,
  createReview
}               = require('../controllers/review');

router.route('/')
  .get(verifyAuth, getReviews)
  .post(verifyAuth, validate('body', createReviewSchema), createReview)

module.exports = router;