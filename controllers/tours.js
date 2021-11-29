const { toursService }  = require('../services');
const {
  APIFeatures,
  catchAsync
}                       = require('../utils');

const getTours = catchAsync(async (req, res) => {
  const { query } = req;
  const features  = new APIFeatures(query);

  const filterBy        = features.filter();
  const sortBy          = features.sort();
  const fields          = features.createFields();
  const { skip, limit } = features.paginate();

  const tours = await toursService.find(filterBy, sortBy, fields, skip, limit);

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});

const getTour = catchAsync(async (req, res) => {
  const { id } = req.params;

  const tour = await toursService.findById(id);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
  
});

const createTour = catchAsync(async (req, res) => {
  const { body }  = req;
  const newTour   = await toursService.create(body); 

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour
    }
  });
});

const updateTour = catchAsync(async (req, res) => {
  const { body: data }  = req;
  const { id }          = req.params;    

  const updatedTour = await toursService.update(id, data);

  res.status(200).json({
    status: 'success',
    data: {
      tour: updatedTour
    }
  });
  
});


const deleteTour = catchAsync(async (req, res) => {
  const { id } = req.params;

  await toursService.delete(id);

  res.status(204).json({
    status: 'success',
    data: null
  });
  
});

const getToursStats = catchAsync(async (_, res) => {
  const stats = await toursService.getToursStats();

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });

});

const getToursStatsMonthlyPerYear = catchAsync(async (req, res) => {
  const { year }  = req.params;
  const stats     = await toursService.getMonthlyStatsPerYear(year);

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