const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne 
}                 = require('./base');
const { 
  tourService
}                 = require('../services');
const {
  catchAsync,
  AppError
}                 = require('../utils');

const getTours    = getAll(tourService);
const getTour     = getOne(tourService);
const createTour  = createOne(tourService);
const updateTour  = updateOne(tourService);
const deleteTour  = deleteOne(tourService);

const getToursWithin = catchAsync(async (req, res, next) => {
  const { radius, latlng, unit }  = req.params;
  const [ lat, lng ]              = latlng.split(',');

  if (!lat || !lng) {
    return next(new AppError('Please provide latitude and longitude together.', 400));
  }

  const tours = await tourService.findToursWithin(lat, lng, radius, unit);

  res.status(200).json({
    message: 'success',
    results: tours.length,
    data: {
      data: tours
    }
  });
});

const getDistancesToTours = catchAsync(async (req, res, next) => {
  const { latlng, unit }  = req.params;
  const [ lat, lng ]      = latlng.split(',');

  if (!lat || !lng) {
    return next(new AppError('Please provide latitude and longitude together.', 400));
  }

  const distances = await tourService.getDistancesToTours(lat, lng, unit);

  res.status(200).json({
    message: 'success',
    results: distances.length,
    data: {
      data: distances
    }
  });
});

const getToursStats = catchAsync(async (_, res) => {
  const stats = await tourService.getToursStats();

  res.status(200).json({
    status: 'success',
    data: {
      data: stats
    }
  });
});

const getToursStatsMonthlyPerYear = catchAsync(async (req, res) => {
  const { year }  = req.params;
  const stats     = await tourService.getMonthlyStatsPerYear(year);

  res.status(200).json({
    status: 'success',
    data: {
      data: stats
    }
  });
});

module.exports = {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getToursWithin,
  getDistancesToTours,
  getToursStats,
  getToursStatsMonthlyPerYear
}