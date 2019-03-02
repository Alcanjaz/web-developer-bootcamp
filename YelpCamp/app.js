const express           = require('express');
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');
const passport          = require('passport');
const localStrategy     = require('passport-local');
const Campground        = require('./models/campground');
const Comment           = require('./models/comment');
const User              = require('./models/user');
const seedDB            = require('./seeds');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); 

mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true});
seedDB();

//PASSPORT CONFIGURATION 
app.use(require("express-session")({
    secret: "Once again Macri it's the best cat!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

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
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
app.get("/campgrounds/new", isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});


//SHOW - shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {
    //find campground with the provided id
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err){
            console.log(err)
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//================================
//COMMENTS ROUTES
//================================

app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
    //find campground by id
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
    //lookup campground using ID
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            console.log(req.body.comment);
            //create new comment
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    // connect new comment to campground
                    campground.save();
                    //redirect campground showpage
                    res.redirect(`/campgrounds/${campground._id}`);
                }
            });
        }
    });
});

//Auth Routes
app.get("/register", (req, res) => {
    res.render("register");
});
//handle sign up logic
app.post("/register", (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/campgrounds");
        });
    });
});

//show login form
app.get("/login", (req, res) => {
    res.render("login");
});
//handling login logic
app.post("/login", passport.authenticate("local", {
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}), (req, res) => {
});

//logout route
app.get("/logout", (req, res) =>{
    req.logOut();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT || 3000, process.env.IP || null, () => {
    console.log('The YelpCamp Server has Started!');
})