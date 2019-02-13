const request = require('request');

request('http://www.google.kjaklacom', (error, response, body) => {
    if(error){
        console.log("something went wrong!");
        console.log(error);
    } else {
        if(response.statusCode == 200) {
            //THINGS WORKED!
            console.log(body);
        }
    }
});

