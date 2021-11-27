const mongoose  = require('mongoose');
const slugify   = require('slugify');

const tourSchema = new mongoose.Schema({
  name: {
    type      : String,
    required  : [true, 'A tour must have a name'],
    unique    : true,
    trim      : true,
    minlength : [5, 'A tour name must have greater than or equal to 5 characters.'],
    maxlength : [25, 'A tour name must have less than or equal to 25 characters.']
  },
  slug        : String,
  duration: {
    type      : Number,
    required  : [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type      : Number,
    required  : [true, 'A tour must have a max group size'],
    min       : [5, 'A tour must have at least 5 people attending.'],
    max       : [20, 'A tour must have less than or equal to 20 people attending.'],
  },
  difficulty: {
    type      : String,
    required  : [true, 'A tour must have a difficulty'],
    enum      : {
      values  : ['easy', 'medium', 'difficult'],
      message : '({VALUE}) is not supported. The supported values: easy, medium and, difficult.'
    }
  },
  ratingsAverage: {
    type      : Number,
    default   : 4.5,
    min       : [1, 'A tour rating must be above or equal to 1.0'],
    max       : [5, 'A tour rating must be below or equal to 5.0']
  },
  ratingsQuantity: {
    type      : Number,
    default   : 0
  },
  price: {
    type      : Number,
    required  : [true, 'A tour must have a price']
  },
  priceDiscount: {
    type      : Number,
    validate  : {
      validator: function(val) {
        return val < this.price
      },
      message : 'A tour\'s price discount must be below tour\'s regular price.'
    }
  },
  summary: {
    type      : String,
    trim      : true,
    required  : [true, 'A must have a summary']
  },
  description: {
    type      : String,
    trim      : true
  },
  imageCover: {
    type      : String,
    required  : [true, 'A tour must have a cover image']
  },
  images      : [String],
  startDates  : [Date],
  createdAt: {
    type      : Date,
    default   : Date.now(),
    select    : false
  },
  isSecret: {
    type      : Boolean,
    default   : false
  }
}, {
  toObject    : { virtuals: true },
  toJSON      : { virtuals: true }
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

  /**
    * tourSchema.post('save', function(doc, next) {
    *   console.log(doc);
    *  
    *   next();
    * });  
    */

/* Query Middleware */
tourSchema.pre(/^find/, function(next) {
  this.find({ isSecret: {$ne: true} });
  
  next();
});

  /** 
    * tourSchema.post(/^find/, function(docs, next) {
    *   next();
    * });
    */

/* Aggregation Middleware */
tourSchema.pre('aggregate', function(next) {
  const pipeline = this.pipeline();

  pipeline.unshift({
    $match: { isSecret: { $ne: true } }
  });

  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;