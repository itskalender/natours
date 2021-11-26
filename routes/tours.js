const express     = require('express');
const router      = express.Router();
const {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour
}                 = require('../controllers/tours');
const {
  createQueryTop5Ratings
}                 = require('../middlewares/tours')

// router.param('id', checkTourId);

router.route('/top-5-ratings')
  .get(createQueryTop5Ratings, getTours)

router.route('/')
  .get(getTours)
  .post(createTour)

router.route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

module.exports = router;