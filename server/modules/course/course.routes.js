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

const { auth, withRoles } = require('../../middleware/auth');


router.post('/', auth, fileUpload('courses').single('poster'), create);

router.get('/', auth, getAll);

router.get('/list/all', auth, getList);

router.get('/list', auth, withRoles, getList);

router.get('/:id', auth, getById);

router.get('/:id/full', auth, getByIdFull);

router.put('/:id', auth, update);

router.delete('/:id', auth, remove);

router.post(
    '/media/:id',
    auth,
    courseMediaFileUpload().fields([
        {name: "posterfile", maxCount: 1},
        {name: "mediafile", maxCount: 1}
    ]),
    createMedia,
    createCourseMedia
);

router.put(
    '/media/:id/:mediaId',
    auth,
    courseMediaFileUpload().fields([
        {name: "posterfile", maxCount: 1},
        {name: "mediafile", maxCount: 1}
    ]),
    updateMedia,
    getByIdFull
);

router.delete(
    '/media/:courseId/:mediaId',
    auth,
    removeCourseMedia,
    removeMedia
);

router.post('/participant', auth, addCourseParticipant);

router.put('/participant/:courseId/:participantId', auth, removeCourseParticipant);

router.post('/coach', auth, addCourseCoach);

router.put('/coach/:courseId/:coachId', auth, removeCourseCoach);




module.exports = router;