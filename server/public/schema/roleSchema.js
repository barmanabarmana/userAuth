const mongoose = require('mongoose');
let roleSchema = new mongoose.Schema({
    value: {
        type: String,
        unique: true,
        default: 'User'
    }
})


module.exports = mongoose.model('Role',roleSchema);
