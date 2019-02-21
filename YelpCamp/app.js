const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true});
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//     name: "Granite Hill", 
//     image: "https://source.unsplash.com/XJuhZqEE4Go",
//     description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
//     }, (err, campground) => {
//         if(err){
//             console.log(err);
//         } else {
//             console.log("Newly created campground!!");
//             console.log(campground);
//         }
//     });


const campgrounds = [
    {name: "Mountain Goat's Rest", image: "https://source.unsplash.com/WaLH-jZVVKE"}
];

app.get("/", (req, res) => {
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", (req, res) => {
    //Get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

//CREATE - add new campground
app.post("/campgrounds", (req, res) => {
    // get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const newCampground = {name: name, image: image, description: desc}
    //Create a new campground and save to DB
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    })
});

//NEW - show form to add a new campground
app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs"); 
});


//SHOW - shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {
    //find campground with the provided id
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            console.log(err)
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});



app.listen(process.env.PORT || 3000, process.env.IP || null, () => {
    console.log('The YelpCamp Server has Started!');
})