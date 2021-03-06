const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middleware = require('../middleware');

//INDEX - show all campgrounds
router.get("/", (req, res) => {
    //Get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//CREATE - add new campground
router.post("/", middleware.isLoggedIn, (req, res) => {
    // get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const price = req.body.price;
    const desc = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    };
    const newCampground = {name: name, image: image, price: price, description: desc, author: author};
    //Create a new campground and save to DB
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err){
            req.flash("error", "Something went wrong.");
            console.log(err);
        } else {
            //redirect back to campgrounds page
            req.flash("success", "Campground created!!");
            res.redirect("/campgrounds");
        }
    })
});

//NEW - show form to add a new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});


//SHOW - shows more info about one campground
router.get("/:id", (req, res) => {
    //find campground with the provided id
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err || !foundCampground){
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground, user: req.user});
        }

    });
});

//Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnerShip, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnerShip, (req, res) => {
    //find the correct campground 
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err){
            req.flash("error", "Something went wrong.");
            res.redirect("/campgrounds");
        } else {
            //redirect somewhere (show page)
            req.flash("success", "Campground updated.");
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
});

// Destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnerShip, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, err => {
        if(err){
            req.flash("error", "Something went wrong.");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground deleted.");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;