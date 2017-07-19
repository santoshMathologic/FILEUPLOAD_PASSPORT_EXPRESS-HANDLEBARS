var mongoose = require('mongoose');

var station = new mongoose.Schema({
    code: String,
    head_station_sign_off_duration: Number,
    head_station_sign_on_duration: Number,
    name: String,
    number_of_beds: Number,
    out_station_sign_off_duration: Number,
    out_station_sign_on_duration: Number,
    markDelete: { type: Boolean, default: false },
    createdTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('station', station);