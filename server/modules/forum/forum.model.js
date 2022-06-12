const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ForumSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
        unique: false,
    },
    mediaPath: {
        type: String,
        required: false,
        unique: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        unique: false,
        ref: "User",
    },
    
}, {
    timestamps: true
});

ForumSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Forum', ForumSchema);