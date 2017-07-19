var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var trainStationSchema = new mongoose.Schema({
    stop_number: Number,
    trainNo: Number,
    code: String,
    arrival: String,
    departure: String,
    day: { type: Number },
    dayOfJourney: { type: Number },
    journey_duration:{ type: Number },
    distance: { type: Number },
    fromStationId : {type:Schema.Types.ObjectId, ref:'station',default:'579d3daee9c1e078d053e6a4'},
    trainId : {type:Schema.Types.ObjectId, ref:'train',default:'579d3daee9c1e078d053e6a4'},
    
});
module.exports = mongoose.model('trainStation', trainStationSchema);