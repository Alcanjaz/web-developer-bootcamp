const express = require('express');
const app = express();

const animals = ([
    {"name": "cow", "sound": "moo"},
    {"name": "dog", "sound": "woof"},
    {"name": "cat", "sound": "meow"},
    {"name": "pig", "sound": "oink"}
]);

app.get('/', (req, res) => {
    res.send("Hi there, welcome to my assignment!");
});

app.get('/speak/:animal/', (req, res) => {
    const query = req.params.animal;
    const animal = animals.find(e => e.name == query);
    if(animal) {
        res.send(`The ${animal.name} says '${animal.sound}'`);
    } else {
        res.send("Sorry, I still haven't that animal in my db");
    }
});

app.get('/repeat/:word/:repeatNumber', (req, res) => {
    const repeatNumber = req.params.repeatNumber;
    const word = `${req.params.word} `;
    res.send(word.repeat(repeatNumber));
});

app.get('*', (req, res) => {
    res.send('Sorry, page not found...What are you doing with your life?');
});

app.listen(process.env.PORT || 3000, process.env.IP || null, () => {
    console.log('listening on port 3000');
});