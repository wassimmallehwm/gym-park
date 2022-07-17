const express = require('express');
const { auth } = require('../../middleware/auth');
const { create, findByChannel } = require('./message.controller');
const router = express.Router();


router.post('/', auth, create);

router.get('/:channel', auth, findByChannel);


module.exports = router;