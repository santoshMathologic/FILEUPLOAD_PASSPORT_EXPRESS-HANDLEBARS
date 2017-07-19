var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET home page. */
router.get('/apiServerConfig', function(req, res, next) {
    res.json({
        protocol: 'http',
        server: 'localhost',
        port: 4000,
        baseUrl : '/api/v1'
    });
});

module.exports = router;
