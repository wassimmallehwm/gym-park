const Forum = require("./forum.model");
    const errorHandler = require("../../utils/errorHandler");
      
module.exports.create = async(req, res) => {
  try {
    let forum = req.body
    forum.user = req.user
    forum.mediaPath = req.file.filename
    const item = new Forum(forum);

    let result = await item.save();
    result = await Forum.findById(result._id)
    .populate({ path: 'user', model: 'User', select: 'firstname lastname imagePath' })
    .exec();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Forum creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Forum'})
  }
};
    
      
module.exports.getAll = async(req, res) => {
  try {
    let query = req.query || {};
    const result = await Forum.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Forum getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Forum'})
  }
};

module.exports.getById = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Forum.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Forum getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Forum'})
  }
};
    
      
module.exports.getList = async(req, res) => {
    try {
      const { page = 1, limit = 10, sortField, sortOrder } = req.query;
      const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: {"_id": -1},
        populate: { path: 'user', model: 'User', select: 'firstname lastname imagePath' }
      };

      if (sortField && sortOrder) {
        options.sort = {
            [sortField]: sortOrder
        }
      }

      const result = await Forum.paginate({}, options);
      return res.status(200).json(result);
    } catch (err) {
      console.error("Forum list failed: " + err);
      const { status, message } = errorHandler(err)
      res.status(status).json({message, entity: 'Forum'})
    }
};
    
      
module.exports.update = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Forum.findOneAndUpdate({ _id: id}, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Forum update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Forum'})
  }
};
    
      
module.exports.remove = async(req, res) => {
  try {
    const { id } = req.params;

    const result = await Forum.deleteOne({ _id: id});
    return res.status(200).json(result);
  } catch (err) {
    console.error("Forum delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Forum'})
  }
};
    
      