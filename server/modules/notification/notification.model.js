const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const NotificationSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        unique: false,
    },
    body: {
        type: String,
        required: true,
        unique: false,
    },
    roles: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        unique: false,
        ref: "Role",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        unique: false,
        ref: "User",
    },
    resource: {
        type: String,
        required: true,
        unique: false,
    },
    type: {
        type: String,
        default: "INFO"
    },
    read: {
        type: Boolean,
        default: false
    }
    
}, {
    timestamps: true
});

NotificationSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Notification', NotificationSchema);