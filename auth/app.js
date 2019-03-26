var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const passport = require('passport')
const mongoose = require('mongoose')
var uuid = require('uuid/v4')
var session = require('express-session')
var FileStore = require('session-file-store')(session)

require('./auth/auth')

const axios = require('axios')

const usersAPIRouter = require('./routes/api/users')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var containerName = 'mongodb'//"localhost"

//Base de dados
mongoose.connect('mongodb://' + containerName + ':27017/dweb13', {useNewUrlParser: true})
  .then(() => console.log('Mongo ready: ' + mongoose.connection.readyState))
  .catch(error => console.error('Erro conexao: ' + error))

app.use(session({
  genid: () => {return uuid()},
  store: new FileStore(),
  secret: 'dweb2018',
  resave: false,
  saveUninitialized: true
}))

// Inicialização do passport
app.use(passport.initialize())
app.use(passport.session())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/s1/api/users', usersAPIRouter)
//app.use('/s1', indexRouter);
app.use('/s1/users', usersRouter);

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

module.exports = app;
