var Campground = require("../models/campground");
var Comment = require("../models/comment");
//All middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    // is user logged in
    if(req.isAuthenticated()){ // reason why we don't use our created middleware is because we want to combine it with this
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                // does user own campground?
                if(foundCampground.author.id.equals(req.user._id)){ // reason why we don't use == or === is b/c we're comparing mongoose obj with a string
                    next(); // we want to move on to do what's next
                } else {
                    // otherwise, redirect
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back"); // redirect to previous page
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    // is user logged in
    if(req.isAuthenticated()){ // reason why we don't use our created middleware is because we want to combine it with this
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                // does user own campground?
                if(foundComment.author.id.equals(req.user._id)){ // reason why we don't use == or === is b/c we're comparing mongoose obj with a string
                    next(); // we want to move on to do what's next
                } else {
                    // otherwise, redirect
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back"); // redirect to previous page
    }
}

// middleware
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that"); // this line does NOT give a flash, but only grants capability of doing so (Note: error can be any name)
    res.redirect("/login");
}

module.exports = middlewareObj;