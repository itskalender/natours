const mongoose  = require('mongoose');
const slugify   = require('slugify');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a max group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A must have a summary']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image']
  },
  images: [String],
  startDates: [Date],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  isSecret: {
    type: Boolean,
    default: false
  }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

tourSchema.virtual('durationWeek').get(function() {
  return (this.duration / 7).toFixed(1);
});

/* Document Middleware */
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, {
    replacement: '_',
    lower: true,
    trim: true
  });
  
  next();
});

/* 
tourSchema.post('save', function(doc,next) {
}); 
*/

/* Query Middleware */
tourSchema.pre(/^find/, function(next) {
  this.find({ isSecret: {$ne: true} });
  this.select('-__v');
  
  next();
});

/*
tourSchema.post(/^find/, function(docs, next) {
  next();
});
*/

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;