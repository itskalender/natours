const express       = require('express');
const morgan        = require('morgan');
const helmet        = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss           = require('xss-clean');
const hpp           = require('hpp');

const app           = express();

const { AppError }  = require('./utils');
const { 
  errorHandler,
  limiter
}                   = require('./middlewares');

const toursRouter   = require('./routes/tours');
const usersRouter   = require('./routes/users');
const reviewsRouter = require('./routes/reviews');

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));

app.use(mongoSanitize());
app.use(xss());
app.use(hpp({
  whitelist: [
    'ratingsAverage',
    'ratingsQuantity',
    'duration',
    'maxGroupSize',
    'difficulty',
    'price',
  ]
}))

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewsRouter);

app.all('*', (req, _) => {
  throw new AppError(
    `This route (${req.originalUrl}) does not exist on the server❗`, 
    404
  );
});

app.use(errorHandler);

module.exports = app;