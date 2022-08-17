const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const SubscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: "User",
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: false,
        ref: "Course",
    },
    approved: {
        type: Boolean,
    },
    isTreated: {
        type: Boolean,
        default: false
    },
    treatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        unique: false,
        ref: "User",
    },
    comment: {
        type: String,
        required: false,
        unique: false
    },
    
}, {
    timestamps: true
});

SubscriptionSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Subscription', SubscriptionSchema);