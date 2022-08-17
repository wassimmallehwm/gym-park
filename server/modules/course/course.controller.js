const Course = require("./course.model");
const errorHandler = require("../../utils/errorHandler");
const mongoose = require("mongoose");
const exec = require('child_process').exec;

const createCourseDir = (id) => {
  exec(`mkdir public\\courses\\${id}`, (error, stdout, stderr) => {
    if (error) {
      console.error(error)
    }
    console.log("course folder created.")
  });
}


const getFullCourseData = async (courseId) => {
  const userFields = 'firstname lastname email imagePath'
  const result = await Course.findById(courseId)
    .populate({ path: 'coachs', model: 'User', select: userFields })
    .populate({ path: 'participants', model: 'User', select: userFields })
    .populate({ path: 'content', model: 'Media' }).exec();
  return result
}

module.exports.create = async (req, res) => {
  try {
    let courseItem = req.body;
    courseItem.poster = req.file.filename
    const item = new Course(courseItem);

    const result = await item.save();
    createCourseDir(result._id)
    return res.status(200).json(result);
  } catch (err) {
    console.error("Course creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Course' })
  }
};

module.exports.getAll = async (req, res) => {
  try {
    let query = req.query || {};
    const result = await Course.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Course getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Course' })
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Course.findById(id)
      .select('label description date poster isPrivate')
      .lean().exec();

    return res.status(200).json(result);
  } catch (err) {
    console.error("Course getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Course' })
  }
};

module.exports.getByIdFull = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getFullCourseData(id)

    return res.status(200).json(result);
  } catch (err) {
    console.error("Course getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Course' })
  }
};

module.exports.getList = async (req, res) => {
  try {
    const { page = 1, limit = 20, sortField, sortOrder } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: {}

    };

    if (sortField && sortOrder) {
      options.sort = {
        [sortField]: sortOrder
      }
    }

    let query = {}

    if(req.roles && req.roles.length > 0){
      req.roles.forEach(role => {
        if(role.label == "COACH"){
          query.coachs = mongoose.Types.ObjectId(req.user)
        }
        if(role.label == "USER"){
          query.participants = mongoose.Types.ObjectId(req.user)
        }
      });
    }

    const result = await Course.paginate(query, options);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Course list failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Course' })
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Course.findOneAndUpdate({ _id: id }, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Course update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Course' })
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Course.deleteOne({ _id: id });
    return res.status(200).json(result);
  } catch (err) {
    console.error("Course delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Course' })
  }
};



module.exports.createCourseMedia = async (req, res) => {
  try {
    const { id } = req.params;

    await Course.updateOne(
      { _id: id },
      { $push: { content: req.media._id } });

    const result = await getFullCourseData(id)
    return res.status(200).json(result);
  } catch (err) {
    console.error("Course creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Course' })
  }
};


module.exports.removeCourseMedia = async (req, res, next) => {
  try {
    const { courseId, mediaId } = req.params;

    const oldItem = await Course.findOne({ _id: courseId })
      .populate({ path: 'content', model: 'Media' }).exec();

    await Course.updateOne(
      { _id: courseId },
      { $pull: { content: mediaId } });

    const result = await getFullCourseData(courseId)

    const oldMedia = oldItem.content.find(elem => elem._id == mediaId)
    let files = [oldMedia.path]
    if (oldMedia.poster && oldMedia.poster != "") {
      files.push(oldMedia.poster)
    }

    req.deleteFiles = files
    req.result = result;
    next()
  } catch (err) {
    console.error("Course media deletion failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Course' })
  }
};



module.exports.addCourseParticipant = async (req, res, next) => {
  try {
    const { courseId, participantId } = req.body;
    
    await Course.updateOne(
      { _id: courseId },
      { $push: { participants: participantId } });

    const result = await getFullCourseData(courseId)
    return res.status(200).json(result);
  } catch (err) {
    console.error("Course participant adding failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Course' })
  }
};

module.exports.removeCourseParticipant = async (req, res, next) => {
  try {
    const { courseId, participantId } = req.params;
    
    await Course.updateOne(
      { _id: courseId },
      { $pull: { participants: participantId } });

    const result = await getFullCourseData(courseId)
    return res.status(200).json(result);
  } catch (err) {
    console.error("Course participant removal failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Course' })
  }
};



module.exports.addCourseCoach = async (req, res, next) => {
  try {
    const { courseId, coachId } = req.body;
    
    await Course.updateOne(
      { _id: courseId },
      { $push: { coachs: coachId } });

    const result = await getFullCourseData(courseId)
    return res.status(200).json(result);
  } catch (err) {
    console.error("Course coach adding failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Course' })
  }
};

module.exports.removeCourseCoach = async (req, res, next) => {
  try {
    const { courseId, coachId } = req.params;
    
    await Course.updateOne(
      { _id: courseId },
      { $pull: { coachs: coachId } });

    const result = await getFullCourseData(courseId)
    return res.status(200).json(result);
  } catch (err) {
    console.error("Course coach removal failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Course' })
  }
};




