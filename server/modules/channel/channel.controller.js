const Channel = require("./channel.model");
    const errorHandler = require("../../utils/errorHandler");
      
module.exports.create = async(req, res) => {
  try {
    const item = new Channel(req.body);

    const result = await item.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Channel creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Channel'})
  }
};
    
      
module.exports.getAll = async(req, res) => {
  try {
    let query = req.query || {};
    const result = await Channel.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Channel getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Channel'})
  }
};

module.exports.getById = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Channel.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Channel getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Channel'})
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

      const result = await Channel.paginate({}, options);
      return res.status(200).json(result);
    } catch (err) {
      console.error("Channel list failed: " + err);
      const { status, message } = errorHandler(err)
      res.status(status).json({message, entity: 'Channel'})
    }
};
    
      
module.exports.update = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Channel.findOneAndUpdate({ _id: id}, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Channel update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Channel'})
  }
};
    
      
module.exports.remove = async(req, res) => {
  try {
    const { id } = req.params;

    const result = await Channel.deleteOne({ _id: id});
    return res.status(200).json(result);
  } catch (err) {
    console.error("Channel delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Channel'})
  }
};
    
      