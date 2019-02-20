const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/mynewdb",{useNewUrlParser: true});

const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

const Cat = mongoose.model("Cat", catSchema);

//adding a new cat to the DB

// const george = new Cat({
//     name: "Macri",
//     age:11,
//     temperament: "Evil"
// });

// george.save((err, cat)=>{
//     if(err){
//         console.log("something went wrong")
//     } else {
//         console.log("WE JUST SAVED A CAT TO THE DB");
//         console.log(cat);
//     }
// });

Cat.create({
    name:"Burbujo",
    age: 5,
    temperament: "Hungry"
}, (err, cat) => {
    if(err) {
        console.log(err);
    } else {
        console.log(cat);
    }
});

//retrieve all cats from the db and console.log each one

Cat.find({}, (err, cats) => {
    if(err){
        console.log("ERROR!!!");
        console.log(err);
    } else {
        console.log("kitties :3");
        console.log(cats);
    }
});