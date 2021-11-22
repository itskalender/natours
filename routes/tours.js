const express = require('express');

const router  = express.Router();
const {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour
}             = require('../controllers/tours');

router.route('/')
  .get(getTours)
  .post(createTour)

router.route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

module.exports = router;