const express           = require('express');
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');
const passport          = require('passport');
const localStrategy     = require('passport-local');
const methodOverride    = require('method-override');
const Campground        = require('./models/campground');
const Comment           = require('./models/comment');
const User              = require('./models/user');
const seedDB            = require('./seeds');

//Requiring routes
const commentRoutes     = require('./routes/comments');
const campgroundRoutes  = require('./routes/campgrounds');
const indexRoutes       = require('./routes/index');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs"); 

mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true});
//Seed the database
// seedDB();

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
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(process.env.PORT || 3000, process.env.IP || null, () => {
    console.log('The YelpCamp Server has Started!');
});