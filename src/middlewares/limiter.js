const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: 'Too many requests performed from this IP, please try again after an hour'
});

module.exports = limiter;
