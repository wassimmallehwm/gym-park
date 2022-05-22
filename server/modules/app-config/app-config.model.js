const mongoose = require('mongoose');


const AppConfigSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    version: {
        type: String,
        required: true,
        unique: true
    },
    social_name: {
        type: String,
        required: true,
        unique: true,
        default: ''
    },
    logo: {
        type: String,
        required: false,
        default: 'default.png'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AppConfig', AppConfigSchema);