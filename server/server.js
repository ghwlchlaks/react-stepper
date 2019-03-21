const express = require('express');
const path = require('path');
const logger = require('morgan');

// controller files
const { kakaoRoute } = require('./controllers/index');

// config files
const { mongoose } = require('./config/index');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error'));
db.once('open', () => {
  console.log('mongoose connection!');
});

const app = express();
const PORT = 4000;

app.use(logger('short'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './../public')));

app.use('/api/kakako', kakaoRoute);

app.listen(PORT, () => {
  console.log('Express is listening on port', PORT);
});

// error handler
app.use(function(err, req, res) {
  console.error(err.stack);
  res.status(500).send('something broke!');
});
