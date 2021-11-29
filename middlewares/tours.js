function createQueryTop5Ratings(req, res, next) {
  const { query } = req;

  query.limit = '5';
  query.sort  = '-ratingsAverage,price';

  next();
}

module.exports = {
  createQueryTop5Ratings,
}