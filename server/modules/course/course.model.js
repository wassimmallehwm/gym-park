const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const CourseSchema = new mongoose.Schema({
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
    level: {
        type: String,
        required: true,
        unique: false,
        enum: ['BEGINER', 'INTERMEDIATE', 'ADVANCED']
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    coachs: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        unique: false,
        ref: "User",
    },
    participants: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        unique: false,
        default: [],
        ref: "User",
    },
    coachs_count: {
        type: Number,
        default: 0,
    },
    participants_count: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        required: true,
        unique: false,
    },
    poster: {
        type: String,
        required: true,
        unique: false,
        default: "course_default",
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

CourseSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Course', CourseSchema);