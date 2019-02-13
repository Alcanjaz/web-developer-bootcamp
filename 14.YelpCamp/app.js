const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    const campgrounds = [
        {name: "Salmon Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f9c87aa7e9b5b1_340.jpg"},
        {name: "Granite Hill", image: "https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104491f9c87aa7e9b5b1_340.jpg"},
        {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b014459cf9c279a3edbc_340.jpg"}
    ]

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(process.env.PORT || 3000, process.env.IP || null, () => {
    console.log('The YelpCamp Server has Started!');
})