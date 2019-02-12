const express = require('express');
const app = express();
const request = require('request'); 

app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("search");
});

app.get("/:results", (req, res) => {
    const query = req.query.search;
    request(`http://www.omdbapi.com/?s=${query}&apikey=1491908c`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
});

app.listen(process.env.PORT || 3000, process.env.IP || null, () => {
    console.log('listening on port 3000');
});
