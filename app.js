const fs      = require('fs');
const express = require('express');

const app   = express();
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
})

app.listen(port, () => {
  console.log(`Server listening on port: ${port}...`);
});