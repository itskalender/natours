function createQueryTop5Ratings(req, res, next) {
  const { query } = req;

  query.limit = '5';
  query.sort  = '-ratingsAverage,price';

  next();
}

function checkTourId(_, res, next, val) {
  if (val > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      data: 'Cannot find a tour with this id❗'
    })
  }

  next();
}

module.exports = {
  createQueryTop5Ratings,
  checkTourId,
}