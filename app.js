const express     = require('express');
const morgan      = require('morgan');

const app         = express();

const toursRouter = require('./routes/tours');
const usersRouter = require('./routes/users');

app.use((req, res, next) => {
  console.log('First Middleware - 1️⃣');
  next();
});
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;