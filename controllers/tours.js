const { toursService }  = require('../services');
const { APIFeatures }   = require('../utils');

async function getTours(req, res) {
  try {
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
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

async function getTour(req, res) {
  const { id } = req.params;

  try {
    const tour = await toursService.findById(id);
  
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

async function createTour(req, res) {
  const { body } = req;
  try {
    const newTour = await toursService.create(body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}

async function updateTour(req, res) {
  const { body: data }  = req;
  const { id }          = req.params;    

  try {
    const updatedTour = await toursService.update(id, data);
  
    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}

async function deleteTour(req, res) {
  const { id } = req.params;

  try {
    await toursService.delete(id);
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}

module.exports = {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour
}