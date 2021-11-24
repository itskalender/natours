const toursService = require('../services/tours');

const getTours = (_, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
    }
  })
}

const getTour = (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    status: 'success',
    data: {
    }
  })
}

const createTour = async (req, res) => {
  const { body } = req;

  try {
    const newTour = await toursService.createTour(body);

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

const updateTour = (_, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated object...>'
    }
  })
}

const deleteTour = (_, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  })
}

module.exports = {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour
}