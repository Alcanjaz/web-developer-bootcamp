const express               = require('express');
const mongoose              = require('mongoose');
const passport              = require('passport');
const bodyParser            = require('body-parser');
const User                  = require('./models/user');
const localStrategy         = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');


const app = express();
mongoose.connect("mongodb://localhost/auth_demo_app", {useNewUrlParser: true});
app.set("view engine", 'ejs');

app.use(require("express-session")({
    secret: "I like Tomatoes",
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//======================================
//ROUTES
//======================================

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret", (req, res) => {
    res.render("secret");
});

//Auth Routes

//show the sign up form
app.get("/register", (req, res) => {
    res.render("register");
});
//handling user signup
app.post("/register", (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/secret");
        });
    });
});

app.listen(process.env.PORT || 3000, process.env.IP || null, () => {
    console.log(`Server listening on port 3000`);
});