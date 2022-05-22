const Forum = require("./forum.model");
    const errorHandler = require("../../utils/errorHandler");
      
module.exports.create = async(req, res) => {
  try {
    const item = new Forum(req.body);

    const result = await item.save();
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
    
      