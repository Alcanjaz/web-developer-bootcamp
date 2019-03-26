const express = require('express');
const router = express.Router({mergeParams:true});
const Campground = require('../models/campground');
const Comment = require ('../models/comment');
const middleware = require('../middleware');

//================================
//COMMENTS ROUTES
//================================

router.get("/new", middleware.isLoggedIn, (req, res) => {
    //find campground by id
    Campground.findById(req.params.id, (err, campground) => {
        if(err || !campground){
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

router.post("/", middleware.isLoggedIn, (req, res) => {
    //lookup campground using ID
    Campground.findById(req.params.id, (err, campground) => {
        if(err || !campground) {
            req.flash("error", "Campground not found");
            res.redirect("/campgrounds");
        } else {
            //create new comment
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    req.flash("error", "Something went wrong.");
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    // connect new comment to campground
                    campground.save();
                    console.log(comment);
                    //redirect campground showpage
                    req.flash("success", "Comment sent!");
                    res.redirect(`/campgrounds/${campground._id}`);
                }
            });
        }
    });
});

//Comment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err || !foundCampground) {
            req.flash("error", "Campground not found");
            return res.redirect("back");
        } 
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err || !foundComment){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
            }
        });
    });
});

//Comment update
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, foundComment) => {
       if(err || !foundComment){
           req.flash("error", "Something went wrong");
           res.send("back");
       } else {
           req.flash("success", "Comment edited");
           res.redirect(`/campgrounds/${req.params.id}`);
       } 
    });
});

//Comment Destroy Route
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
   Comment.findByIdAndRemove(req.params.comment_id, (err) => {
       if(err){
           req.flash("error", "Something went wrong");
           res.redirect("back");
       } else {
           req.flash("success", "Comment deleted");
           res.redirect(`/campgrounds/${req.params.id}`);
       }
   });
});

module.exports = router;