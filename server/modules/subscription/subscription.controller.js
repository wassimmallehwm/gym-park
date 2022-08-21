const Subscription = require("./subscription.model");
const Course = require("../course/course.model");
const errorHandler = require("../../utils/errorHandler");
const mongoose = require("mongoose");
const { notif_enums } = require("../../constants/notification");
const { notif_types } = require("../notification/constants");
const { sendNotifToAdmins } = require("../notification/notification.service");

const sendNotif = async (io, subId) => {
  const fullData = await Subscription.findById(subId)
    .populate({ path: 'user', model: 'User', select: 'firstname lastname' })
    .populate({ path: 'course', model: 'Course', select: 'label' })
    .lean().exec();
  const { SUBJECT, CONTENT } = notif_types[notif_enums.SUBSCRIPTION_REQ_SENT]
  const notifData = {
    subject: SUBJECT,
    body: CONTENT.replace('$user', `${fullData.user.firstname} ${fullData.user.lastname}`).replace('$course', fullData.course.label),
    resource: "SUBSCRIPTION"
  }
  sendNotifToAdmins(io, notifData)
}

module.exports.create = async (req, res) => {
  try {
    const { user, course } = req.body
    const exists = await Subscription.findOne({ user, course })
    if (exists) {
      return res.status(400).json({ message: 'Subscription pending', entity: 'Subscription' })
    }
    const item = new Subscription(req.body);
    const result = await item.save();
    sendNotif(req.io, result._id)
    return res.status(200).json(result);
  } catch (err) {
    console.error("Subscription creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Subscription' })
  }
};


module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const userFields = 'firstname lastname email imagePath'
    const courseFields = 'label description poster'
    const result = await Subscription.findById(id)
      .populate({ path: 'user', model: 'User', select: userFields })
      .populate({ path: 'course', model: 'Course', select: courseFields })
      .lean().exec();

    return res.status(200).json(result);
  } catch (err) {
    console.error("Subscription getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Subscription' })
  }
};


module.exports.getList = async (req, res) => {
  try {
    const { page = 1, limit = 20, sortField, sortOrder } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: {},
      populate: [
        { path: 'user', model: 'User', select: 'firstname lastname' },
        { path: 'course', model: 'Course', select: 'label' }
      ]

    };

    if (sortField && sortOrder) {
      options.sort = {
        [sortField]: sortOrder
      }
    }

    let query = {}

    const result = await Subscription.paginate(query, options);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Subscription list failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Subscription' })
  }
};

const treateSubScription = async (id, user, approved, comment = '') => {
  const data = {
    approved: approved,
    isTreated: true,
    treatedBy: user,
    comment
  }
  const result = await Subscription.findOneAndUpdate({ _id: id }, data, { new: true });
  return result
}

module.exports.approve = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await treateSubScription(id, req.user, true)

    await Course.updateOne(
      { _id: result.course },
      { $push: { participants: result.user } });
    return res.status(200).json(result);
  } catch (err) {
    console.error("Subscription approve failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Subscription' })
  }
};

module.exports.reject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await treateSubScription(id, req.user, false, req.body.comment)

    return res.status(200).json(result);
  } catch (err) {
    console.error("Subscription reject failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'Subscription' })
  }
};

