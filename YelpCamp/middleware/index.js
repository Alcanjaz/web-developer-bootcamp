const Campground = require('../models/campground');
const Comment = require('../models/comment');

/**
 * Middleware Object.
 * It contains all methods for authentication and authorization
 * for campgrounds and comments
 */
const middlewareObj = {

    /**
     * This function checks if the user is logged in
     * for submit campgrounds and comments
     */
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "You need to be logged to do that.");
        res.redirect("/login");
    },

    /**
     * This function checks if the author of campground
     * is logged in for edit or delete campgrounds
     */
    checkCampgroundOwnerShip(req, res, next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, (err, foundCampground) => {
                if(err || !foundCampground){
                    req.flash("error", "Campground not found.");
                    res.redirect("back");
                } else {
                    //does user own the campground?
                    if(foundCampground.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that");
                        res.redirect("back");
                    }
                }
            });
        } else {
            res.redirect("back");
        }
    },

    /**
     * This function checks if the author of the comment is logged
     * for edit or delete the comment
     */
    checkCommentOwnership(req, res, next) {
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, (err, foundComment) => {
                if(err || !foundComment) {
                    req.flash("error", "Comment not found.");
                    res.redirect("back"); 
                } else {
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that");
                        res.redirect("back");
                    }
                }
            });
        } else {
            res.redirect("back");
        }
    }
}

module.exports = middlewareObj;