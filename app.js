var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors');
var indexRouter = require('./routes/index');
var TransportRouter = require('./routes/API/Transportrecord');
var CustomerRouter=require('./routes/API/CustomerData');
var TouristRouter=require('./routes/API/TouristGuides');
var users=require('./routes/API/users');
var cities=require('./routes/API/Cities');
var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/API/Transportrecord', TransportRouter);
app.use('/API/CustomerData',CustomerRouter);
app.use('/API/TouristGuides',TouristRouter)
app.use('/API/users',users);
app.use('/API/Cities',cities);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
mongoose.connect("mongodb+srv://akashurrehman123:WgE7Wtk79FCL7QIN@cluster0.se4lf.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB...."))
    .catch((error) => console.log(error.message));
module.exports = app;