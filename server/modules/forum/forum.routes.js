const express = require('express');
const { auth } = require('../../middleware');
const { fileUpload } = require('../../utils/fileUpload');
const { create, getAll, getById, getList, update, remove} = require('./forum.controller');
const router = express.Router();

router.post('/', auth, fileUpload('forum').single('media'), create);

router.get('/', getAll);

router.get('/list', getList);

router.get('/:id', getById);

router.put('/:id', update);

router.delete('/:id', remove);

module.exports = router;