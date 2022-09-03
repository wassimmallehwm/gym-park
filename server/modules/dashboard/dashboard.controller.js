const User = require("../user/user.model");
const Role = require("../role/role.model");
const Course = require("../course/course.model");
const errorHandler = require("../../utils/errorHandler");

// const rolesQuery = () => {
//   let query = {};
//     ["COACH", "USER"].forEach(
//       elem => query['$or'].push({ roles: mongoose.Types.ObjectId(elem._id) })
//     )
//   return query
// }

module.exports.counts = async (req, res) => {
  try {
    let result = {}
    const roles = await Role.find({ label: { $ne: 'ADMIN' } })
    result.coachs = await User.find({ roles: roles.find(elem => elem.label == 'COACH')._id }).count().exec();
    result.users = await User.find({ roles: roles.find(elem => elem.label == 'USER')._id }).count().exec();
    result.courses = await Course.find().count().exec()

    return res.status(200).json(result);
  } catch (err) {
    console.error("counts failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Dashboard' })
  }
};


module.exports.topCourses = async (req, res) => {
  try {
    const result = await Course.find()
      .select('participants_count date description isPrivate label level poster')
      .sort('-participants_count')
      .limit(10).exec()

    return res.status(200).json(result);
  } catch (err) {
    console.error("top courses failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Dashboard' })
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Booking.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Booking getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Booking' })
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

    const result = await Booking.paginate({}, options);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Booking list failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Booking' })
  }
};


module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Booking.findOneAndUpdate({ _id: id }, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Booking update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Booking' })
  }
};


module.exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Booking.deleteOne({ _id: id });
    return res.status(200).json(result);
  } catch (err) {
    console.error("Booking delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Booking' })
  }
};

