const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3030;

const dbConnect = require('./database');
const globalMiddelwares = require('./middleware');

globalMiddelwares(app, __dirname);
dbConnect();


app.listen(PORT, () => {
  console.info('Listening on port ' + PORT);
});