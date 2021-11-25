const toursService = require('../services/tours');

const getTours = async (_, res) => {
  try {
    const tours = await toursService.find();

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

const getTour = async (req, res) => {
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

const createTour = async (req, res) => {
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

const updateTour = async (req, res) => {
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