const { catchAsync }    = require('../utils');
const { reviewService } = require('../services');

const getReviews = catchAsync(async (req, res) => {
  const reviews = await reviewService.find();

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  })
});

const createReview = catchAsync(async (req, res) => {
  const { body }        = req;
  const { id: userId }  = req.user;
  const { id: tourId }  = req.params;

  body.author = body.author ? body.author : userId;
  body.tour   = body.tour   ? body.tour   : tourId;

  const review = await reviewService.create(body);

  res.status(201).json({
    message: 'success',
    data: {
      review
    }
  });
});

module.exports = {
  getReviews,
  createReview
}