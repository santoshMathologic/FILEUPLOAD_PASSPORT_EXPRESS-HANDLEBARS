
var express = require('express');
var mongoose = require('mongoose');
var q = require('q');
require('mongoose-query-paginate');
var router = express.Router();
var Multer = require('multer');
var Parse = require('csv-parse');
var fs = require('fs');
var json2csv = require('json2csv');
var trainStationModel = require('../models/trainStation.js');

var trainData = [];


var uploadObj = {

    parseCSVFile: function (req, res, next) {
        var relativefilePath = req.file.path;

        fs.readFile(relativefilePath, "utf8", function (err, data) {
            if (err) throw err;
            else {
                parseRecords(data).then(function (response) {

                    console.log("" + response);
                    res.status(200);
                    res.json({
                        "success":true,
                        "status": 200,
                        "message": "File has been Upload successfully into DB !!!!!"
                    });

                });
            }

            fs.unlink(relativefilePath, function (err) {
                if (err) console.log(err);
                else {
                    console.log("file deleted" + relativefilePath);

                }
            });

        });

    }
};

parseRecords = function (data) {
    var deferred = q.defer();
    data += '\n';
    var re = /\r\n|\n\r|\n|\r/g;
    var rows = data.replace(re, "\n").split("\n");

    for (var i = 1; i < rows.length; i++) {
        var rowdata = rows[i].split(",");
        var slNo = rowdata[1];
        var trainNo = rowdata[0];
        var stationCode = rowdata[2];
        var dayOfJourney = rowdata[3];
        var arrivalTime = rowdata[4];
        var departureTime = rowdata[5];
        var distance = rowdata[6];
        pushDataToArray(slNo, trainNo, stationCode, dayOfJourney, arrivalTime, departureTime, distance);
    }

    uploadToServer().then(function (res) {
        deferred.resolve("Parse All Records Successfully");
    });

    return deferred.promise;
};


uploadToServer = function () {

    var deferred = q.defer();

    var dir = './serverUpload';
    var fileName = "train_station.csv";
    var headerfields = ['slNo', 'trainNo', 'stationCode', 'dayofJourney', 'arrivalTime', 'departureTime', 'distance'];

    if (trainData && trainData.length) {

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        var csv = json2csv({ data: trainData, fields: headerfields });

        fs.writeFile(dir + "/" + fileName, csv, function (err) {
            if (err) throw err;
            console.log('file Uploaded to Server successfully!!!!');
            saveTrainStationToDB().then(function saveFromDB(res) {

                deferred.resolve("file Uploaded to Server successfully!!!!");

            });
        });

    }
    return deferred.promise;
};

pushDataToArray = function (islno, Train_No, stationCode, dayofJourney, arrivaltime, departuretime, distance) {
    trainData.push({
        slNo: islno,
        trainNo: Train_No,
        stationCode: stationCode,
        dayofJourney: dayofJourney,
        arrivalTime: arrivaltime,
        departureTime: departuretime,
        distance: distance,
    });

};

saveTrainStationToDB = function () {
    var deferred = q.defer();
    trainStationModel.insertMany(trainData, function (err, result) {
        if (err) return err;
        deferred.resolve("Records successfully saved to DB");

    });
    return deferred.promise;
};


module.exports = uploadObj;