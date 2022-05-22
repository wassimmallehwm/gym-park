const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const MediaSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: false,
    },
    path: {
        type: String,
        required: true,
        unique: false,
    },
    description: {
        type: String,
        required: false,
        unique: false,
    },
    poster: {
        type: String,
        required: false,
        unique: false,
    },
    type: {
        type: String,
        required: false,
        unique: false,
    },
    
}, {
    timestamps: true
});

MediaSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Media', MediaSchema);