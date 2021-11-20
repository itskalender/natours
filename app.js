const fs      = require('fs');
const express = require('express');

const app   = express();
app.use(express.json());

const port  = 3000;

const tours = JSON.parse( fs.readFileSync('./dev-data/data/tours-simple.json', 'utf8') );

app.get('/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
});

app.post('/v1/tours', (req, res) => {
  const { body } = req;
  
  const newId   = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, body);

  tours.push(newTour);

  fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours, null, 2), (err) => {
    if (err)
      console.error(err);
    
    res.status(201).json(newTour);
  } );
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}...`);
});