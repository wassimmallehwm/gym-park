const express = require('express');
const { getConfig, update, uploadLogo } = require('./app-config.controller');
const router = express.Router();

router.get('/', getConfig);

router.put('/', update);

router.post('/logo', uploadLogo);

module.exports = router;