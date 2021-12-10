const BaseService = require('./base');
const { Tour }    = require('../models');

class TourService extends BaseService {
  async findById(id) {
    return this.model.findById(id).populate('reviews');
  }

  async findToursWithin(lat, lng, radius, unit) {
    const radium = unit === 'mi' 
      ? radius / 3963.2
      : radius / 6378.1

    return this.model.find({
      startLocation: {
        $geoWithin: { $centerSphere: [[lng, lat], radium] }
      }
    });
  }

  async getDistancesToTours(lat, lng, unit) {
    const multiplier = unit === 'mi'
      ? 0.000621371
      : 0.001

    return this.model.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [Number(lng), Number(lat)]
          },
          distanceField: 'distance',
          distanceMultiplier: multiplier
        }
      },
      {
        $project: {
          distance: 1,
          name: 1
        }
      }
    ]);
  }

  async getToursStats() {
    return this.model.aggregate([
      {
        $match: {
          ratingsAverage: { $gte: 4.5 }
        }
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty'},
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price'},
          maxPrice: { $max: '$price'}
        }
      },
      {
        $sort: { 
          avgRating: -1, avgPrice: 1
        }
      },
    ]);
  }

  async getMonthlyStatsPerYear(year) {
    return this.model.aggregate([
      {
        $unwind: '$startDates'  
      },
      {
        $match: { 
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          } 
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTours: { $sum: 1 },
          tours: { $push: '$name' },
        }
      },
      {
        $addFields: {
          month: '$_id'
        }
      },
      {
        $project: {
          '_id': 0
        }
      },
      {
        $sort: { 
          numTours: -1
        }
      },
      {
        $limit: 12
      }
    ]);
  }
}

module.exports = new TourService(Tour);