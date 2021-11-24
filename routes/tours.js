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
  checkReqBody
}                 = require('../middlewares/tours');


// router.param('id', checkTourId);

router.route('/')
  .get(getTours)
  .post(checkReqBody, createTour)

router.route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

module.exports = router;