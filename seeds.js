var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var seeds = [
    {
        name: "Cloud's Rest", 
        image: "http://el-granada.com/2013/summersolstice/tenthalfdome.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa", 
        image: "https://i1.wp.com/theovercast.ca/wp-content/uploads/2017/05/camping.jpg?resize=759%2C500&ssl=1",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTLC4aB2iyTyw8lIIOcwL7_rCXcjMrSiuOmCTGW-E9Fqtp0Ia9",
        description: "blah blah blah"
    }
    
];

async function seedDB(){
    try {// Remove all campgrounds 
        await Campground.remove({}); 
        console.log("Campgrounds removed");
        await Comment.remove({});
        console.log("Commnets removed");
        
        for(const seed of seeds){
            let campground = await Campground.create(seed);
            console.log("Campground created");
            let comment = await Comment.create(
                {
                     text: "This place is great, but I wish there was internet",
                     author: "Homer"
                }
            )
            console.log("Comment created");
            campground.comments.push(comment);
            campground.save();
            console.log("Comment added to campground");
        }
    } catch (err){
        console.log(err);
    } 
}
            
module.exports = seedDB;