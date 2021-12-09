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
  catchAsync
}                 = require('../utils');

const getTours    = getAll(tourService);
const getTour     = getOne(tourService);
const createTour  = createOne(tourService);
const updateTour  = updateOne(tourService);
const deleteTour  = deleteOne(tourService);

const getToursStats = catchAsync(async (_, res) => {
  const stats = await tourService.getToursStats();

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});

const getToursStatsMonthlyPerYear = catchAsync(async (req, res) => {
  const { year }  = req.params;
  const stats     = await tourService.getMonthlyStatsPerYear(year);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});

module.exports = {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getToursStats,
  getToursStatsMonthlyPerYear
}