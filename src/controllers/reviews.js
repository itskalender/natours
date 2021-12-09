const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
}                       = require('./base');
const { reviewService } = require('../services');

const getReviews    = getAll(reviewService);
const getReview     = getOne(reviewService);
const createReview  = createOne(reviewService);
const updateReview  = updateOne(reviewService);
const deleteReview  = deleteOne(reviewService);

module.exports = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview
}