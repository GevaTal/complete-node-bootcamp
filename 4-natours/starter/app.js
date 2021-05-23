const express = require ('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes')
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

app.use((req,res,next) => {
    console.log('Hello from the middleware');
    next();
});

app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next();
});





// app.patch('/api/v1/tours/:id',);
// app.delete('/api/v1/tours/:id',deleteTour);
//app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours',creatTour);
// app.get('/api/v1/tours',getAllTours);

app.route('/');

module.exports = app;