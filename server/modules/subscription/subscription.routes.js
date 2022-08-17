const express = require('express');
const { 
    create,
    getList,
    getById,
    approve,
    reject
} = require('./subscription.controller');
const router = express.Router();
const { auth } = require('../../middleware/auth');


router.post('/', auth, create);

router.get('/list', auth, getList);

router.get('/:id', auth, getById);

router.put('/approve/:id', auth, approve);

router.put('/reject/:id', auth, reject);


module.exports = router;