const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/fallinlovewith/:thing", (req, res) => {
    const thing = req.params.thing;
    res.render("love.ejs", {thingVar: thing});
});

app.get("/posts", (req, res) => {
    const posts = [
        {title: "Post 1", author: "Susy"},
        {title: "My adorable pet bunny", author: "Charlie"},
        {title: "Can you believe this pomsky?", author: "Colt"}
    ];

    res.render("posts.ejs", {posts: posts});
});


app.listen(process.env.PORT || 3000, process.env.IP || null, ()=> {
    console.log('listening on port 3000');
});