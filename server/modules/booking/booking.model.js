const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const BookingSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: "Course",
    },
    participant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: "User",
    },
    status: {
        type: String,
        required: false,
        unique: false,
        default: "PENDING",
    },
    description: {
        type: String,
        required: false,
        unique: false,
        default: "Pending for approval",
    },
    
}, {
    timestamps: true
});

BookingSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Booking', BookingSchema);