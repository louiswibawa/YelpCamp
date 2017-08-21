var express = require("express");
var router = express.Router({mergeParams: true}); // new instance of express router, allow the :id to get to this file for req.params.id
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware"); // requiring a dir by default requires index.js

// ================
// COMMENTS ROUTES
// ================

// COMMENTS NEW
router.get("/new", middleware.isLoggedIn, function(req, res){ // middleware isLoggedIn to enable only logged in users to add comment
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//COMMENTS CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create a new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Creating comment unsuccessful");
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id; // req.user is guarantee to be not null because of the middleware isLoggedIn
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash("success", "Successfully addded comment");
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment}); 
        }
    });
});

//COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    // findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);    
        }
    });
});

module.exports = router;