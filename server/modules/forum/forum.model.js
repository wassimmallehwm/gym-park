const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ForumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: false,
    },
    body: {
        type: String,
        required: true,
        unique: false,
    },
    media: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        unique: false,
        ref: "Media",
    },
    
}, {
    timestamps: true
});

ForumSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Forum', ForumSchema);