const Course = require("./course.model");
const errorHandler = require("../../utils/errorHandler");

module.exports.create = async (req, res) => {
  try {
    let courseItem = req.body;
    courseItem.poster = req.file.filename
    const item = new Course(courseItem);

    const result = await item.save();
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
      .select('label description date poster')
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
    const userFields = 'firstname lastname email imagePath'
    const result = await Course.findById(id)
    .populate({ path: 'coachs', model: 'User', select: userFields })
    .populate({ path: 'participants', model: 'User', select: userFields }).exec();

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

    const result = await Course.paginate({}, options);
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

