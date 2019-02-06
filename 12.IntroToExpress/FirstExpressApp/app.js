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

app.listen(process.env.PORT || 3000, process.env.IP || null, ()=> console.log(`listening on port 3000`));