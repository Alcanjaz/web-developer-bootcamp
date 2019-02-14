const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

const campgrounds = [
    {name: "Salmon Creek", image: "https://source.unsplash.com/1azAjl8FTnU"},
    {name: "Granite Hill", image: "https://source.unsplash.com/XJuhZqEE4Go"},
    {name: "Mountain Goat's Rest", image: "https://source.unsplash.com/WaLH-jZVVKE"}
];

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
    // get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs"); 
});

app.listen(process.env.PORT || 3000, process.env.IP || null, () => {
    console.log('The YelpCamp Server has Started!');
})