var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
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
    
]

function seedDB(){
        // Remove all campgrounds 
        Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
            // add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground!");
                        // create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                         });
                    }
                });
            });
        });
}

module.exports = seedDB;