const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const apiRouter = require('./routes/apiRouter');
const app = express();
const commentsRouter = require('./routes/commentsRoutes');

app.use(
  cors({
    origin: 'http://localhost:8081', // Разрешить только клиент
  }),
);

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api', apiRouter);
app.use('/api/comments', commentsRouter);

module.exports = app;
