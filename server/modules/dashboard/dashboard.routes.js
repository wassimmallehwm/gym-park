const express = require('express');
const { auth, admin } = require('../../middleware/auth');
const { counts, topCourses } = require('./dashboard.controller');
const router = express.Router();

router.get('/counts', auth, admin, counts);

router.get('/top-courses', auth, admin, topCourses);

module.exports = router;