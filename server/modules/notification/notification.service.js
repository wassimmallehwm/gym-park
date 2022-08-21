const Notification = require("./notification.model");
const Role = require("../role/role.model");
      
const save = async(data) => {
  try {
    const item = new Notification(data);
    const result = await item.save();
    return result;
  } catch (err) {
    console.error("Notification creation failed: " + err);
  }
};

module.exports.sendNotifToAdmins = async (io, data) => {
    try {
        const admin = await Role.findOne({label: 'ADMIN'})
        data.roles = [admin._id]
        const notif = await save(data) 
        io.sockets.in("ADMIN").emit('notif', notif);
    } catch (err) {
      console.error("Notification creation failed: " + err);
    }
}