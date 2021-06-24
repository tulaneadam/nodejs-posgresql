const { Appsignal } = require("@appsignal/nodejs");
const appsignal = new Appsignal({
  active: true,
  name: "quotes-api",
  apiKey: "27aec3a5-ee1a-492b-b45d-64153e3d79ae",
});

var express = require('express');
const { expressMiddleware, expressErrorHandler } = require("@appsignal/express");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var quotesRouter = require('./routes/quotes');

var app = express();

app.use(expressMiddleware(appsignal));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/quotes', quotesRouter);

app.use(expressErrorHandler(appsignal))

module.exports = app;
