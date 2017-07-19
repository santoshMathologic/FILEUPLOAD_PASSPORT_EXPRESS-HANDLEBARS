
var trainType = require("../models/trainType.js");


var ttobj = {
    get: function (req, res) {
        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
        };
        var query = trainType.find({});
        query.paginate(options, function (err, result) {
            if (err) throw err;
            res.json(result);
        });


    }
}

module.exports = ttobj;