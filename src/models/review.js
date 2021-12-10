const mongoose  = require('mongoose');
const Tour      = require('../models/tour');

const reviewSchema = new mongoose.Schema({
  review: {
    type          : String,
    required      : [true, 'A review cannot be empty.'],
    maxlength     : 200
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
  }
},
{
  toObject        : { virtuals: true },
  toJSON          : { virtuals: true }
});

reviewSchema.statics.saveTourStats = async function(id) {
  const stats = await this.aggregate([
    {
      $match: {
        tour: id 
      }
    },
    {
      $group: {
        _id: '$tour',
        numRatings: { $sum: 1 },
        avgRatings: { $avg: '$rating'}
      } 
    }
  ]);
  
  let numRatings = 0;
  let avgRatings = 4.5;

  if (stats.length) {
    numRatings = stats[0].numRatings;
    avgRatings = stats[0].avgRatings;
  }

  await Tour.findByIdAndUpdate(id, {
    ratingsAverage: avgRatings,
    ratingsQuantity: numRatings
  });
}

reviewSchema.post('save', function() {
  this.constructor.saveTourStats(this.tour);
});

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'author',
    select: 'name photo'
  });

  next();
});

reviewSchema.pre(/^findOneAnd/, async function(next) {
  const doc   = await this.findOne();
  this.review = doc;

  next();
});

reviewSchema.post(/^findOneAnd/, async function() {
  const id = this.review.tour;

  this.review.constructor.saveTourStats(id);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;