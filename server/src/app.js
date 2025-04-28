const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/apiRouter');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api', apiRouter);

module.exports = app;
