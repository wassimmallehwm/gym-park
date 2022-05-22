const Role = require("./role.model");
    const errorHandler = require("../../utils/errorHandler");
      
module.exports.create = async(req, res) => {
  try {
    const item = new Role(req.body);

    const result = await item.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Role creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Role'})
  }
};
    
      
module.exports.getAll = async(req, res) => {
  try {
    let query = req.query || {};
    const result = await Role.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Role getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Role'})
  }
};

module.exports.getById = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Role.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Role getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Role'})
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

      const result = await Role.paginate({}, options);
      return res.status(200).json(result);
    } catch (err) {
      console.error("Role list failed: " + err);
      const { status, message } = errorHandler(err)
      res.status(status).json({message, entity: 'Role'})
    }
};
    
      
module.exports.update = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Role.findOneAndUpdate({ _id: id}, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Role update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Role'})
  }
};
    
      
module.exports.remove = async(req, res) => {
  try {
    const { id } = req.params;

    const result = await Role.deleteOne({ _id: id});
    return res.status(200).json(result);
  } catch (err) {
    console.error("Role delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Role'})
  }
};
    
      