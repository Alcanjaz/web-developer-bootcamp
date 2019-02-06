const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/fallinlovewith/:thing", (req, res) => {
    const thing = req.params.thing;
    res.render("love.ejs", {thingVar: thing});
});


app.listen(process.env.PORT || 3000, process.env.IP || null, ()=> {
    console.log('listening on port 3000');
});