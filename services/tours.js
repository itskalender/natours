const BaseService = require('./base-service');
const { Tour }    = require('../models');

class TourService extends BaseService {
  async getToursStats() {
    try {
      const stats = await this.model.aggregate([
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
          $sort: { avgRating: -1, avgPrice: 1 }
        },
        // {
        //   $match: {
        //     _id: { $ne: 'EASY'}
        //   }
        // }
      ])
      return stats;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new TourService(Tour);