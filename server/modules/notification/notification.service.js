const Notification = require("./notification.model");
const Role = require("../role/role.model");
const { notif_types } = require("./constants");
const { notif_enums } = require("../../constants/notification");

const save = async (data) => {
    try {
        const item = new Notification(data);
        const result = await item.save();
        return result;
    } catch (err) {
        console.error("Notification creation failed: " + err);
    }
};

const sendNotifToAdmins = async (io, data) => {
    try {
        const admin = await Role.findOne({ label: 'ADMIN' })
        data.roles = [admin._id]
        const notif = await save(data)
        io.sockets.in("ADMIN").emit('notif', notif);
    } catch (err) {
        console.error("Notification creation failed: " + err);
    }
}

const sendNotifToUser = async (io, data, user) => {
    try {
        data.user = user
        const notif = await save(data)
        io.sockets.in(user.toString()).emit('notif', notif);
    } catch (err) {
        console.error("Notification creation failed: " + err);
    }
}



module.exports.sendSubscriptionReq = async (io, data) => {
    const { SUBJECT, CONTENT } = notif_types[notif_enums.SUBSCRIPTION_REQ_SENT]
    const notifData = {
        subject: SUBJECT,
        body: CONTENT.replace('$user', `${data.user.firstname} ${data.user.lastname}`).replace('$course', data.course.label),
        resource: "SUBSCRIPTION"
    }
    sendNotifToAdmins(io, notifData)
}

module.exports.sendSubscriptionReqAprroved = async (io, user) => {
    const { SUBJECT, CONTENT } = notif_types[notif_enums.SUBSCRIPTION_REQ_APPROVED]
    const notifData = {
        subject: SUBJECT,
        body: CONTENT,
        resource: "SUBSCRIPTION"
    }
    sendNotifToUser(io, notifData, user)
}

module.exports.sendSubscriptionReqRejected = async (io, user, reason) => {
    const { SUBJECT, CONTENT } = notif_types[notif_enums.SUBSCRIPTION_REQ_REJECTED]
    const notifData = {
        subject: SUBJECT,
        body: CONTENT.replace('$reason', reason),
        resource: "SUBSCRIPTION"
    }
    sendNotifToUser(io, notifData, user)
}