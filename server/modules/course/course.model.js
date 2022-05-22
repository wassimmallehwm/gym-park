const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const CourseSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true,
    },
    coachs: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        unique: false,
        ref: "User",
    },
    description: {
        type: String,
        required: false,
        unique: false,
    },
    participants: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        unique: false,
        default: [],
        ref: "User",
    },
    date: {
        type: Date,
        required: true,
        unique: false,
    },
    
}, {
    timestamps: true
});

CourseSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Course', CourseSchema);