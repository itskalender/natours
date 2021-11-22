const fs      = require('fs');
const express = require('express');
const morgan  = require('morgan');

const app   = express();

/* MIDDLEWARES */
app.use((req, res, next) => {
  console.log('My first middleware - 1 1️⃣');
  next();
});
app.use(morgan('dev'));
app.use(express.json());

/* SERVER SETTINGS */
const port  = 3000;

/* REQUEST HANDLERS */
const tours = JSON.parse( fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf8') );
const getTours = (req, res) => {
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

  if (id > tours.length - 1) {
    res.status(404).json({
      status: 'fail',
      data: 'Cannot find a tour with this id'
    })
  }

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

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours, null, 2), (err) => {
    if (err)
      console.error(err);
    
    res.status(201).json(newTour);
  } );
}
const updateTour = (req, res) => {
  const { id } = req.params;

  if (id > tours.length - 1) {
    res.status(404).json({
      status: 'fail',
      data: 'Cannot find a tour with this id'
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated object...>'
    }
  })
}
const deleteTour = (req, res) => {
  const { id } = req.params;

  if (id > tours.length - 1) {
    res.status(404).json({
      status: 'fail',
      data: 'Cannot find a tour with this id'
    })
  }

  res.status(204).json({
    status: 'success',
    data: null
  })

}

const getUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has not been created yet ❗'
  })
}
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has not been created yet ❗'
  })
}
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has not been created yet ❗'
  })
}
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has not been created yet ❗'
  })
}
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route has not been created yet ❗'
  })
}

/* ROUTES */
app.route('/api/v1/tours')
  .get(getTours)
  .post(createTour)

app.route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

app.route('/api/v1/users')
  .get(getUsers)
  .post(createUser)

app.route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

/* STARTING THE SERVER */
app.listen(port, () => {
  console.log(`Server listening on port: ${port}...`);
});