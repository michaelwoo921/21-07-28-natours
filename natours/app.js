const express = require('express');
const morgan = require('morgan');

console.log(`${__dirname}/routes/tourRoutes`);
const tourRouter = require(`${__dirname}/routes/tourRoutes`);
const userRouter = require(`${__dirname}/routes/userRoutes`);

const app = express();

// 1) Middleware
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
