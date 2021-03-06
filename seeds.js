var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "http://el-granada.com/2013/summersolstice/tenthalfdome.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu feugiat pretium nibh ipsum consequat nisl vel pretium. Blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada. Ipsum a arcu cursus vitae congue mauris rhoncus. Natoque penatibus et magnis dis. Amet cursus sit amet dictum sit amet justo donec. Urna nunc id cursus metus. Metus vulputate eu scelerisque felis imperdiet proin fermentum. Sit amet facilisis magna etiam. Nascetur ridiculus mus mauris vitae ultricies. Sit amet consectetur adipiscing elit pellentesque habitant. Quis ipsum suspendisse ultrices gravida dictum fusce ut. Vestibulum lectus mauris ultrices eros in. Id diam maecenas ultricies mi eget mauris pharetra."
    },
    {
        name: "Desert Mesa", 
        image: "https://i1.wp.com/theovercast.ca/wp-content/uploads/2017/05/camping.jpg?resize=759%2C500&ssl=1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu feugiat pretium nibh ipsum consequat nisl vel pretium. Blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada. Ipsum a arcu cursus vitae congue mauris rhoncus. Natoque penatibus et magnis dis. Amet cursus sit amet dictum sit amet justo donec. Urna nunc id cursus metus. Metus vulputate eu scelerisque felis imperdiet proin fermentum. Sit amet facilisis magna etiam. Nascetur ridiculus mus mauris vitae ultricies. Sit amet consectetur adipiscing elit pellentesque habitant. Quis ipsum suspendisse ultrices gravida dictum fusce ut. Vestibulum lectus mauris ultrices eros in. Id diam maecenas ultricies mi eget mauris pharetra."
    },
    {
        name: "Canyon Floor", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTLC4aB2iyTyw8lIIOcwL7_rCXcjMrSiuOmCTGW-E9Fqtp0Ia9",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu feugiat pretium nibh ipsum consequat nisl vel pretium. Blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada. Ipsum a arcu cursus vitae congue mauris rhoncus. Natoque penatibus et magnis dis. Amet cursus sit amet dictum sit amet justo donec. Urna nunc id cursus metus. Metus vulputate eu scelerisque felis imperdiet proin fermentum. Sit amet facilisis magna etiam. Nascetur ridiculus mus mauris vitae ultricies. Sit amet consectetur adipiscing elit pellentesque habitant. Quis ipsum suspendisse ultrices gravida dictum fusce ut. Vestibulum lectus mauris ultrices eros in. Id diam maecenas ultricies mi eget mauris pharetra."
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