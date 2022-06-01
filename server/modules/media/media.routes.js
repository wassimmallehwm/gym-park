const express = require('express');
const { createMedia, getAll, getById, getList, updateMedia, removeMedia} = require('./media.controller');
const router = express.Router();

router.post('/', createMedia);

router.get('/', getAll);

router.get('/list', getList);

router.get('/:id', getById);

router.put('/:id', updateMedia);

router.delete('/:id', removeMedia);

module.exports = router;