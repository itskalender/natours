const fs      = require('fs');
const express = require('express');

const app   = express();
app.use(express.json());

const port  = 3000;

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

app.route('/api/v1/tours')
  .get(getTours)
  .get(createTour)

app.route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

//#region Old version of routes
/* app.get('/api/v1/tours', getTours);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour); */
//#endregion

app.listen(port, () => {
  console.log(`Server listening on port: ${port}...`);
});