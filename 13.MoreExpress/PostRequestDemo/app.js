const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/friends", (req, res) => {
    const friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];
    res.render("friends", {friends: friends});
});

app.post("/addfriend", (req, res) => {
    console.log(req.body);
    res.send('you have reached a post route 0w0');
});

app.listen(process.env.PORT || 3000, process.env.IP || null, () => {
    console.log('listening on port 3000');
});