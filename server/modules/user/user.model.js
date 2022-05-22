const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstname: {
        type: String,
        required: true,
        unique: false,
    },
    lastname: {
        type: String,
        required: true,
        unique: false,
    },
    phone: {
        type: String,
        required: true,
        unique: false,
    },
    birthdate: {
        type: Date,
        required: true,
        unique: false,
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    sex: {
        type: String,
        required: true,
        unique: false,
    },
    channels: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        unique: false,
        default: [],
        ref: "channel",
    },
    roles: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        unique: false,
        ref: "Role",
    },
    imagePath: {
        type: String,
        default: 'user_default'
    },
    enabled : {
        type: Boolean,
        default: true
    }
    
}, {
    timestamps: true
});

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', UserSchema);