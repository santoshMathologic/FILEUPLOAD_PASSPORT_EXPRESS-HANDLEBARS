var mongoose = require('mongoose');

var trainType = new mongoose.Schema({
    name: String,
    markDelete: { type: Boolean, default: false },
    createdTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('trainType', trainType);