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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: "User",
    },
    relatedTo: {
        type: String,
        required: true,
        unique: false,
    },
    
}, {
    timestamps: true
});

NotificationSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Notification', NotificationSchema);