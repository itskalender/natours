const express             = require('express');
const router              = express.Router();
const reviewRouter        = require('./reviews');
const {
  createQueryTop5Ratings,
  verifyAuth,
  restrictTo,
  validate
}                         = require('../middlewares');
const {
  createTourValidation,
  updateTourValidation
}                         = require('../validations');
const {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getToursStats,
  getToursStatsMonthlyPerYear
}                         = require('../controllers/tours');

router.use('/:tourId/reviews', reviewRouter)

router.route('/stats')
  .get(getToursStats)

router.route('/top-5-ratings')
  .get(
    createQueryTop5Ratings,
    getTours
  )

router.route('/monthly-stats/:year')
  .get(
    verifyAuth,
    restrictTo('guide', 'lead-guide', 'admin'),
    getToursStatsMonthlyPerYear
  )

router.route('/')
  .get(getTours)
  .post(
    verifyAuth,
    restrictTo('lead-guide', 'admin'),
    validate('body', createTourValidation),
    createTour
  )

router.route('/:id')
  .get(getTour)
  .patch(
    verifyAuth,
    restrictTo('lead-guide', 'admin'),
    validate('body', updateTourValidation),
    updateTour
  )
  .delete(
    verifyAuth,
    restrictTo('lead', 'admin'),
    deleteTour
  )

module.exports = router;