var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentsRouter = require('./routes/students');

const mongoose = require('mongoose')

const Students = require('./models/students')
const Movies = require('./models/movies')

// var collection
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://Joy:mongodb@cluster0-6vjeq.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// const connect = client.connect(err => {
//   collection = client.db("video").collection("movieDetails");
//   // perform actions on the collection object
//   client.close();
// });


// mongoose.connect('mongodb+srv://Joy:mongodb@cluster0-6vjeq.mongodb.net/test?retryWrites=true&w=majority', {
//   useNewUrlParser: true
// }).then(function () {
//   console.log('mongoDB connected');
// })
//   .catch(function () {
//     console.log('Error :');
//   })

const url = 'mongodb+srv://Joy:mongodb@cluster0-6vjeq.mongodb.net/video?retryWrites=true&w=majority'
const { connection } = mongoose
mongoose.connect(url)
  .then(() => {
    console.log("connected")
  })

var app = express();

app.get('/actors', (req, res) => {
  mongoose.connection.db
    .collection('movieDetails')
    .find({ actors: 'Chris Pine' })
    .toArray()
    .then(result => {
      res.json(result)
    })
})


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set("views", path.resolve(__dirname, "views"))
app.set("view engine", "ejs")

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/studentlist', studentsRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.jade');
});

module.exports = app;
