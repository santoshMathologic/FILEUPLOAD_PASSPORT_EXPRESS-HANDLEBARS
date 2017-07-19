var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence');
var Schema = mongoose.Schema;
var train = new mongoose.Schema({
    trainNo: Number,
    trainName: String,
    trainType: String,
    fromStation: String,
    toStation: String,
    arrival: String,
    departure: String,
    startDay : [{type:Number}],
    runningDay : {type:Number,default:0},
    markDelete:{type:Boolean,default:false},
    createdTime: {type:Date , default:Date.now},
    fromStationId : {type:Schema.Types.ObjectId, ref:'station',default:'579d3daee9c1e078d053e6a4'},
    toStationId : {type:Schema.Types.ObjectId, ref:'station',default:'579d3daee9c1e078d053e6a4'},
    trainTypeId : {type:Schema.Types.ObjectId, ref:'trainType',default:'5790a72fe9c19b8160a5b003'},
    
});
train.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('train', train);