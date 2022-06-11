const express = require('express');
const {fileUpload, courseMediaFileUpload} = require('../../utils/fileUpload');
const { createMedia, removeMedia, updateMedia } = require('../media/media.controller');
const { 
    create,
    getAll,
    getById,
    getByIdFull,
    getList,
    update,
    remove,
    createCourseMedia,
    removeCourseMedia,
    removeCourseParticipant,
    removeCourseCoach,
    addCourseCoach,
    addCourseParticipant
} = require('./course.controller');
const router = express.Router();

var multer  = require('multer');

var upload = multer() ;

router.post('/', fileUpload('courses').single('poster'), create);

router.get('/', getAll);

router.get('/list', getList);

router.get('/:id', getById);

router.get('/:id/full', getByIdFull);

router.put('/:id', update);

router.delete('/:id', remove);

router.post(
    '/media/:id',
    courseMediaFileUpload().fields([
        {name: "posterfile", maxCount: 1},
        {name: "mediafile", maxCount: 1}
    ]),
    createMedia,
    createCourseMedia
);

router.put(
    '/media/:id/:mediaId',
    courseMediaFileUpload().fields([
        {name: "posterfile", maxCount: 1},
        {name: "mediafile", maxCount: 1}
    ]),
    updateMedia,
    getByIdFull
);

router.delete(
    '/media/:courseId/:mediaId',
    removeCourseMedia,
    removeMedia
);

router.post('/participant', addCourseParticipant);

router.put('/participant/:courseId/:participantId', removeCourseParticipant);

router.post('/coach', addCourseCoach);

router.put('/coach/:courseId/:coachId', removeCourseCoach);




module.exports = router;