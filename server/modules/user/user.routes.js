const express = require('express');
const { create, getAll, getById, getList, update, remove, login, search} = require('./user.controller');
const router = express.Router();

router.post('/login', login);

router.post('/', create);

router.get('/', getAll);

router.get('/search', search);

router.get('/list', getList);

router.get('/:id', getById);

router.put('/:id', update);

router.delete('/:id', remove);

module.exports = router;