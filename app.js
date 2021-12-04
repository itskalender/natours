const express       = require('express');
const morgan        = require('morgan');

const app           = express();

const { AppError }  = require('./utils');
const { 
  errorHandler,
  limiter
}                   = require('./middlewares');
const toursRouter   = require('./routes/tours');
const usersRouter   = require('./routes/users');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api', limiter);
app.use(express.json());

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);


app.all('*', (req, _) => {
  throw new AppError(
    `This route (${req.originalUrl}) does not exist on the server❗`, 
    404
  );
});

app.use(errorHandler);

module.exports = app;