const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ChannelSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
        unique: false,
    },
    isPrivate: {
        type: Boolean,
        required: true,
        unique: false,
        default: false,
    },
    content: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        unique: false,
        default: [],
        ref: "Media",
    },
    
}, {
    timestamps: true
});

ChannelSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Channel', ChannelSchema);