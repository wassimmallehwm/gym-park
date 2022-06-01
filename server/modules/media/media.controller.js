const Media = require("./media.model");
const errorHandler = require("../../utils/errorHandler");
const { deleteResourcefile } = require('../../utils/fileDelete')
const fs = require('fs');

module.exports.createMedia = async (req, res, next) => {
  try {
    if(!req.mediafile){
      return res.status(400).json({ message: 'fileMissing', entity: 'Media' })
    }
    let item = req.body;
    if (req.posterfile) {
      item.poster = req.posterfile
    }
    item.path = req.mediafile
    item = new Media(item);

    const result = await item.save();
    req.media = result;
    next()
    //return res.status(200).json(result);
  } catch (err) {
    console.error("Media creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Media' })
  }
};


module.exports.getAll = async (req, res) => {
  try {
    let query = req.query || {};
    const result = await Media.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Media getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Media' })
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Media.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Media getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Media' })
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

    const result = await Media.paginate({}, options);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Media list failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Media' })
  }
};


module.exports.updateMedia = async (req, res, next) => {
  try {
    const { mediaId } = req.params;
    let item = req.body;
    if (req.mediafile) {
      item.path = req.mediafile
      //deleteResourcefile('courses', courseId, elem)
    }
    if (req.posterfile) {
      item.poster = req.posterfile
    }
    //item = new Media(item);
    await Media.updateOne({ _id: mediaId }, item);

    next()
    //return res.status(200).json(result);
  } catch (err) {
    console.error("Media update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Media' })
  }
};

// gets executed after removing the media from the object
// result to return saved in req.result
module.exports.removeMedia = async (req, res) => {
  try {
    const { courseId, mediaId } = req.params;

    if (req.deleteFiles) {
      req.deleteFiles.forEach(elem => {
        deleteResourcefile('courses', courseId, elem)
      });
    }

    await Media.deleteOne({ _id: mediaId });
    return res.status(200).json(req.result);
  } catch (err) {
    console.error("Media delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Media' })
  }
};

