const User = require("./user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHandler = require("../../utils/errorHandler");

function generateToken(id) {
  return token = jwt.sign({
      _id: id
  }, process.env.JWT_SECRET,
      { expiresIn: '1d' })
}

function userResponse(data) {
  const {
      _id,
      firstname,
      lastname,
      email,
      phone,
      roles,
      createdAt,
      imagePath
  } = data;
  const userResp = {
      _id,
      firstname,
      lastname,
      email,
      phone,
      role: roles[0]._id,
      isAdmin: roles[0].label == "ADMIN" ? true : false,
      createdAt,
      imagePath
  }
  return userResp;
}

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Fields missing !" })


    const user = await User.findOne({email})
      .populate({ path: 'roles', model: 'Role', select: 'label' }).exec();
    if (!user)
      return res.status(404).json({ msg: "Account does not exist !" })
    if (!user.enabled)
      return res.status(400).json({ msg: "Account disabled !" })


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(404).json({ msg: "Invalid Credentials !" })

    const token = generateToken(user._id);
    const response = userResponse(user)
    response.token = token;
    res.status(200).json(response);
  } catch (err) {
    console.log(err)
    const { status, message } = errorHandler(err)
    res.status(status).json(message)
  }
}

module.exports.create = async (req, res) => {
  try {
    const item = new User(req.body);

    const result = await item.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error("User creation failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'User' })
  }
};


module.exports.getAll = async (req, res) => {
  try {
    let query = req.query || {};
    const result = await User.find(query);

    return res.status(200).json(result);
  } catch (err) {
    console.error("User getAll failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'User' })
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id);

    return res.status(200).json(result);
  } catch (err) {
    console.error("User getById failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'User' })
  }
};


module.exports.getList = async (req, res) => {
  try {
    const { page = 1, limit = 20, sortField, sortOrder } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      select: 'firstname lastname createdAt',
      lean: true,
      sort: {},
      populate: { path: 'roles', model: 'Role', select: 'label' }

    };

    if (sortField && sortOrder) {
      options.sort = {
        [sortField]: sortOrder
      }
    }

    const result = await User.paginate({}, options);
    return res.status(200).json(result);
  } catch (err) {
    console.error("User list failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'User' })
  }
};


module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findOneAndUpdate({ _id: id }, req.body, { new: true });

    return res.status(200).json(result);
  } catch (err) {
    console.error("User update failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'User' })
  }
};


module.exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await User.deleteOne({ _id: id });
    return res.status(200).json(result);
  } catch (err) {
    console.error("User delete failed: " + err);
    const { status, message } = errorHandler(err)
    res.status(status).json({ message, entity: 'User' })
  }
};

