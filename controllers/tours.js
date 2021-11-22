const fs = require('fs');

const tours = JSON.parse( fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8') );

const checkTourId = (_, res, next, val) => {
  if (val > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      data: 'Cannot find a tour with this id'
    })
  }
  next();
}

const checkReqBody = (req, res, next) => {
  const { body } = req;

  if (body.name === undefined || body.price === undefined) {
    return res.status(400).json({
      status: 'fail',
      message: 'You have to specify tour name and tour price❗'
    })
  }

  next();
}

const getTours = (_, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
}

const getTour = (req, res) => {
  const { id } = req.params;

  const tour = tours.find(tour => tour.id == id);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
}

const createTour = (req, res) => {
  const { body } = req;
  
  const newId   = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, body);

  tours.push(newTour);

  fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours, null, 2), (err) => {
    if (err)
      console.error(err);
    
    res.status(201).json(newTour);
  });
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
  checkTourId,
  checkReqBody,
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour
}