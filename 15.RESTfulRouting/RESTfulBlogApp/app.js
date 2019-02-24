const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect("mongodb://localhost/restful_blog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


//Mongoose/Model Config
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now()}
})

const Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTES

app.get("/", (req, res) => {
    res.redirect("/blogs");
});


//Index route
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

app.get("/blogs/new", (req, res) => {
    res.render("new");
});

//Create route
app.post("/blogs", (req, res) => {
    //create blog
    Blog.create(req.body.blog, (err, newBlog) =>{
        if(err) {
            res.render("new");
        } else {
            //then, redirect to de index
            res.redirect("/blogs");
        }
    });
});

//Show route
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

app.listen(process.env.PORT || 3000, process.env.IP || null, ()=> {
    console.log("server is running");
});