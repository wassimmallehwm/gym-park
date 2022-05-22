const Media = require("./media.model");
    const errorHandler = require("../../utils/errorHandler");
      
module.exports.create = async(req, res) => {
  try {
    const item = new Media(req.body);

    const result = await item.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Media creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Media'})
  }
};
    
      
module.exports.getAll = async(req, res) => {
  try {
    let query = req.query || {};
    const result = await Media.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Media getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Media'})
  }
};

module.exports.getById = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Media.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Media getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Media'})
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

      const result = await Media.paginate({}, options);
      return res.status(200).json(result);
    } catch (err) {
      console.error("Media list failed: " + err);
      const { status, message } = errorHandler(err)
      res.status(status).json({message, entity: 'Media'})
    }
};
    
      
module.exports.update = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Media.findOneAndUpdate({ _id: id}, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Media update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Media'})
  }
};
    
      
module.exports.remove = async(req, res) => {
  try {
    const { id } = req.params;

    const result = await Media.deleteOne({ _id: id});
    return res.status(200).json(result);
  } catch (err) {
    console.error("Media delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Media'})
  }
};
    
      