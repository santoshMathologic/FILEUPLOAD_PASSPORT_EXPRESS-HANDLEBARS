
var station = require("../models/station.js");


var stationobj = {
    get: function (req, res) {
        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
        };
        var query = station.find({});
        query.paginate(options, function (err, result) {
            if (err) throw err;
            res.json(result);
        });


    }
}

module.exports = stationobj;