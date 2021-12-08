const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type          : String,
    required      : [true, 'A review cannot be empty.'],
    maxlength     : 100
  },

  rating: {
    type          : Number,
    min           : 1,
    max           : 5,
  },

  author: {
    type          : mongoose.Schema.Types.ObjectId,
    ref           : 'User',
    required      : [true, 'A review must belong to a author.']
  },

  tour: {
    type          : mongoose.Schema.Types.ObjectId,
    ref           : 'Tour',
    required      : [true, 'A review must belong to a tour.']
  },

  createdAt: {
    type          : Date,
    default       : Date.now(),
    select        : false
  }
},
{
  toObject        : { virtuals: true },
  toJSON          : { virtuals: true }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;