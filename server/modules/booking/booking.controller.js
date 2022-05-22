const Booking = require("./booking.model");
    const errorHandler = require("../../utils/errorHandler");
      
module.exports.create = async(req, res) => {
  try {
    const item = new Booking(req.body);

    const result = await item.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Booking creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Booking'})
  }
};
    
      
module.exports.getAll = async(req, res) => {
  try {
    let query = req.query || {};
    const result = await Booking.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Booking getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Booking'})
  }
};

module.exports.getById = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Booking.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Booking getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Booking'})
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

      const result = await Booking.paginate({}, options);
      return res.status(200).json(result);
    } catch (err) {
      console.error("Booking list failed: " + err);
      const { status, message } = errorHandler(err)
      res.status(status).json({message, entity: 'Booking'})
    }
};
    
      
module.exports.update = async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Booking.findOneAndUpdate({ _id: id}, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Booking update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Booking'})
  }
};
    
      
module.exports.remove = async(req, res) => {
  try {
    const { id } = req.params;

    const result = await Booking.deleteOne({ _id: id});
    return res.status(200).json(result);
  } catch (err) {
    console.error("Booking delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({message, entity: 'Booking'})
  }
};
    
      