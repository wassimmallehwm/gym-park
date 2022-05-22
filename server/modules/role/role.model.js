const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const RoleSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true,
        default: "USER",
    },
    
}, {
    timestamps: true
});

RoleSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Role', RoleSchema);