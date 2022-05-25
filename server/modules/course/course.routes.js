const express = require('express');
const fileUpload = require('../../utils/fileUpload');
const { create, getAll, getById, getByIdFull, getList, update, remove} = require('./course.controller');
const router = express.Router();

router.post('/', fileUpload('courses').single('poster'), create);

router.get('/', getAll);

router.get('/list', getList);

router.get('/:id', getById);

router.get('/:id/full', getByIdFull);

router.put('/:id', update);

router.delete('/:id', remove);

module.exports = router;