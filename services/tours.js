const Tour = require('../models/tour');

const createTour = async data => {
  try {
    const newTour = await Tour.create(data);
    
    return newTour;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createTour
}