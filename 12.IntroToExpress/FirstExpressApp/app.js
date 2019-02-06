const express = require('express');
const app = express();


//"/" => Say "Hi there!!!"
app.get('/', (req, res) => res.send('Hi there!!'));

//"/bye" => "Goodbye!!"
app.get('/bye', (req, res) => res.send('Goodbye!!'));

//"/dog" => "MEOW!!"
app.get('/dog', (req, res) => {
    console.log('someone made a request to /dog!')
    res.send('MEOW!!')
});

//ROUTE PARAMS
app.get('/r/:subredditName', (req, res) => {
    const subreddit = req.params.subredditName;
    res.send(`welcome to the ${subreddit} subreddit!!`);
});

app.get('/r/:subredditName/comments/:id/:title/', (req, res) => {
    console.log(req.params);
    res.send('welcome to comments page!!');
});

//CATCH MISSING ROUTES
app.get('*', (req, res) => res.send('You are a star!!'));

app.listen(process.env.PORT || 3000, process.env.IP || null, ()=> console.log(`listening on port 3000`));