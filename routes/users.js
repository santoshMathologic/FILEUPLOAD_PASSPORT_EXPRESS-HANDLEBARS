var express = require('express');
var router = express.Router();
var userModel = require("../models/users");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

router.get('/login', function (req, res) {

    res.render("login");
});

router.get('/register', function (req, res) {
    res.render("register");
});

router.get('/logout', function (req, res) {
    //res.render("register"); 
    res.send("You have Successfully Logout");
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}), function (req, res) {
    res.redirect("/");
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        userModel.getUserByUserName(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            userModel.comparePassword(password,user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid Password ' });
                }
            });

        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    userModel.getUserById(id, function (err, user) {
        done(err, user);
    });
});





router.post('/api/v1/register', function (req, res) {



    req.assert('username', 'username required').notEmpty();
    req.assert('email', 'valid email required').notEmpty();
    req.assert('password', 'valid email required').notEmpty();
    req.assert("mobile", "mobile is required").notEmpty();
    req.assert("address", "address is required").notEmpty();
    req.assert("city", "city is required").notEmpty();
    req.assert("state", "state is required").notEmpty();
    req.assert("country", "country is required").notEmpty();
    req.assert("pincode", "pin is required").notEmpty();



    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            var errors = result.useFirstErrorOnly().array();
            res.render("register", {
                errors: errors
            });
        } else {
            var NewUser = new userModel({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
            });

            userModel.createUser(NewUser, function (err, result) {
                if (err) throw err;
                console.log("Successfully saved !!!");
            });

            req.flash("success_msg", "You are successfully register now you can login !!!!!!!!!");
            res.redirect("/users/login");


        }

    });


});


module.exports = router;
