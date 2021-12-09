const { 
  createOne,
  updateOne,
  deleteOne }           = require('./base');
const { catchAsync }    = require('../utils');
const { reviewService } = require('../services');

const getReviews = catchAsync(async (req, res) => {
  const { id: tourId} = req.params;
  const filter        = {};

  if (tourId) {
    filter.tour = tourId;
  }

  const reviews = await reviewService.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  })
});

const createReview = createOne(reviewService);

const updateReview = updateOne(reviewService);

const deleteReview = deleteOne(reviewService);

module.exports = {
  getReviews,
  createReview,
  updateReview,
  deleteReview
}