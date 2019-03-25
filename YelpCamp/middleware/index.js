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
     * @param {*} req Express request
     * @param {*} res Express response
     * @param {*} next Express next
     */
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
    },

    /**
     * This function checks if the author of campground
     * is logged in for edit or delete campgrounds
     * @param {*} req Express request
     * @param {*} res Express response
     * @param {*} next Express next
     */
    checkCampgroundOwnerShip(req, res, next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, (err, foundCampground) => {
                if(err){
                    res.redirect("back");
                } else {
                    //does user own the campground?
                    if(foundCampground.author.id.equals(req.user._id)) {
                        next();
                    } else {
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
     * @param {*} req Express request
     * @param {*} res Express response
     * @param {*} next Express next
     */
    checkCommentOwnership(req, res, next) {
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, (err, foundComment) => {
                if(err) {
                   res.redirect("back"); 
                } else {
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                    } else {
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