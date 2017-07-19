var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var user = new mongoose.Schema({
    username: String,
    password: String,
    email: { type: String, default: null },
    markDelete: { type: Boolean, default: false },
    createdTime: { type: Date, default: Date.now },
    roleId: { type: Schema.Types.ObjectId, ref: 'role', default: '59441ac3677c791b602c0026' },


});

var User = module.exports = mongoose.model('user', user);

module.exports.createUser = function (newUser, callBack) {

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callBack);
        });
    });


};

module.exports.getUserByUserName = function (username, callback) {
    var query = { username: username };
    User.findOne(query, callback);
};
module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};


module.exports.comparePassword = function (userpassword, hashpassword, callback) {
    bcrypt.compare(userpassword, hashpassword, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);

    });
};

