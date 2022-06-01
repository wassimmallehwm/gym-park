const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const globalMiddelwares = (app, dir) => {
  app.use('/public', express.static(path.join(dir, 'public')));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}))
  app.use(morgan('dev'));

  app.use('/api/users', require('../modules/user'))
  app.use('/api/channels', require('../modules/channel'))
  app.use('/api/medias', require('../modules/media'))
  app.use('/api/roles', require('../modules/role'))
  app.use('/api/courses', require('../modules/course'))
  app.use('/api/bookings', require('../modules/booking'))
  app.use('/api/notifications', require('../modules/notification'))
  app.use('/api/forums', require('../modules/forum'))
  
}

module.exports = globalMiddelwares;