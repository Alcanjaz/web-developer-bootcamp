const express = require('express');
const app = express();
const request = require('request'); 


app.get("/results", (req, res) => {
    request('http://www.omdbapi.com/?s=harry&apikey=1491908c', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const results = JSON.parse(body);
            res.send(results.Search[0]);
        }
    });
});

app.listen(process.env.PORT || 3000, process.env.IP || null, () => {
    console.log('listening on port 3000');
});
