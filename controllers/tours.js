const toursService = require('../services/tours');

async function getTours(req, res) {
  try {
    const { query } = req;
    const { sort }  = query;
    
    /* Creating Filtering */
    let filterBy = {};

    for (let key in query) {
      const excludedFields  = ['page', 'sort', 'limit', 'fields'];
      if (!excludedFields.includes(key)) {
        filterBy[key] = query[key];
      }
    }
    filterBy = JSON.parse( JSON.stringify(filterBy).replace(/\b(gt|gte|lt|lte\b)/g, match => `$${match}`) );

    /* Creating Sorting */
    const sortBy = sort ? sort.replaceAll(',', ' ') : sort;
    
    /* Delegating to the Service */
    const tours = await toursService.find(filterBy, sortBy);

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