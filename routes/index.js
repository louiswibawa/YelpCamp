var express = require("express");
var router = express.Router(); // new instance of express router
var passport = require("passport");
var User = require("../models/user");

//ROOT ROUTE
router.get("/", function(req, res){
    res.render("landing"); 
});

//=======================================
// Auth routes
//=======================================

// SHOW REGISTER FORM ROUTE
router.get("/register", function(req, res){
    res.render("register"); 
});

// HANDLE SIGN UP LOGIC ROUTE
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username}); 
    User.register(newUser, req.body.password, function(err, user){ // create a new user
        if(err){
            req.flash("error", err.message); // err messages come from mongoose --> passport --> mongoose passport local pckge
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){ // logging user in
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login"); 
});

//handling login logic
// app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", // use local strategy through passportLocalMongoose // logging user in
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!"); // success can be any name
    res.redirect("/campgrounds");
});

module.exports = router;