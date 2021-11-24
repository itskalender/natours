const Tour = require('../models/tour');

const find = async () => {
  try {
    const tours = await Tour.find();
    
    return tours;
  } catch (err) {
    throw err;
  }
}

const findById = async (id) => {
  try {
    const tour = await Tour.findById(id);

    return tour;
  } catch (err) {
    throw err;
  }
}

const create = async data => {
  try {
    const newTour = await Tour.create(data);

    return newTour;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  find,
  findById,
  create
}