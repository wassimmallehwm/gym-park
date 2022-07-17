const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const MessageSchema = new mongoose.Schema({
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'channel',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

MessageSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Message', MessageSchema);