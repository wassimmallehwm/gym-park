const express = require('express');
const { create, getAll, getById, getList, update, remove, addMembers} = require('./channel.controller');
const router = express.Router();

router.post('/', create);

router.get('/', getAll);

router.get('/list', getList);

router.get('/:id', getById);

router.put('/:id', update);

router.delete('/:id', remove);

router.post('/:id/members', addMembers)

module.exports = router;