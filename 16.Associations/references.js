const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/blog_demo_2", {useNewUrlParser: true});

const Post = require('./models/post');
const User = require('./models/user');

// Post.create({
//     title: "How to cook the best burger 3",
//     content: "sajdkjakljdkljasldk"
// }, (err, post) => {
//     if(err) {
//         console.log(err);
//     } else {
//         User.findOne({email: "bob@gmail.com"}, (err, foundUser) => {
//             if(err){
//                 console.log(err);
//             } else {
//                 foundUser.posts.push(post);
//                 foundUser.save((err, data) => {
//                     if(err){
//                         console.log(err);
//                     } else {
//                         console.log(data);
//                     }
//                 });
//             }
//         });
//     }
// });

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// }, (err, user) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

//Find user
//Find all posts for that user

User.findOne({email: "bob@gmail.com"}).populate("posts").exec((err, user) => {
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
});

