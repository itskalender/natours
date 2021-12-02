const express     = require('express');
const router      = express.Router();
const {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getToursStats,
  getToursStatsMonthlyPerYear
}                 = require('../controllers/tours');
const {
  createQueryTop5Ratings,
  verifyAuth
}                 = require('../middlewares');

// router.param('id', checkTourId);

router.route('/stats')
  .get(getToursStats)

router.route('/monthly-stats/:year')
  .get(getToursStatsMonthlyPerYear)

router.route('/top-5-ratings')
  .get(createQueryTop5Ratings, getTours)

router.route('/')
  .get(verifyAuth, getTours)
  .post(createTour)

router.route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

module.exports = router;