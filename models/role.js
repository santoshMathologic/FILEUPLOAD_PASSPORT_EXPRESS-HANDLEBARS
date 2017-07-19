var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var role = new mongoose.Schema({
    name: String,
    markDelete:{type:Boolean,default:false},
    createdTime: {type:Date , default:Date.now},
});

module.exports = mongoose.model('role', role);