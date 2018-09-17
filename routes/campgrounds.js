var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var NodeGeocoder = require('node-geocoder');
var multer = require("multer");
var storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null, Date.now() + file.originalname);
    }
});
var imageFilter = function(req, file, cb){
    //accept image files only
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
        return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
};
var upload = multer({storage: storage, fileFilter: imageFilter});

var cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: "dgwtkxi3j",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

//----------------------------------------------------------------------------//
//---------------------------------Index Route--------------------------------//
//----------------------------------------------------------------------------//

// INDEX - show all campgrounds
router.get("/", function(req, res){
    var noMatch = null;
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), "gi");
         //Get all campgrounds from DB
        Campground.find({name: regex}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            } else {
                if(allCampgrounds.length < 1){
                    noMatch = "No campgrounds match that query, please try again!";
                }
                res.render("campgrounds/index", {campgrounds: allCampgrounds, noMatch: noMatch});
            }
        });
    } else {
        // Get all campgrounds from DB
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            } else {
                res.render("campgrounds/index", {campgrounds:allCampgrounds, noMatch: noMatch});
            }
        });
    }
});

//----------------------------------------------------------------------------//
//---------------------------Creates New Campground---------------------------//
//----------------------------------------------------------------------------//


//CREATE - add new campground to DB

router.post("/", middleware.isLoggedIn, upload.single("image"), function(req, res){
    // upload the image that is chosen by user to cloudinary
    cloudinary.v2.uploader.upload(req.file.path, function(err, result){
            if(err) {
            req.flash('error', err.message);
            return res.redirect('back');
            }
         // get "result" from cloudinary 
         // add cloudinary url for the image to the campground object under image property
         // add image's public_id to campground object
         console.log(result);
          var image = {
                       id: result.public_id,
                       url: result.secure_url
                       };
        //get data from form and add to campground array
          var name = req.body.campground.name;
          var description = req.body.campground.description;
          var cost= req.body.campground.cost;
          var author = {
                         id: req.user._id,
                         username: req.user.username
                                      };
      // add location to campground by geocoder for Google Maps
      geocoder.geocode(req.body.campground.location, function (err, data) {
        if (err || !data.length) {
          req.flash('error', 'Invalid address');
          return res.redirect('back');
        }
        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var location = data[0].formattedAddress;
        var newCampground = {name, cost, image, description, author, location, lat, lng};
          //Create a new campground and save to DB       
          Campground.create(newCampground, function(err, campground) {
            if (err) {
              req.flash('error', err.message);
              return res.redirect('back');
            }
            res.redirect('/campgrounds/' + campground.id);
          });
      });
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// SHOW PAGE - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground ){
            console.log(err);
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//----------------------------------------------------------------------------//
//--------------------------Edit the Campground-----------------------------//
//----------------------------------------------------------------------------//

// EDIT CAMPGROOOUND ROUTE
// Fixed by Ian's advice////
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        //find the campground with provided ID
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// UPDATE CAMPGROUND ROUTE

router.put("/:id", middleware.checkCampgroundOwnership, upload.single("image"), function(req, res){
    Campground.findById(req.params.id, async function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            if (req.file) {
              try {
                  // destroy previous image in cloudinary
                  // shoud be "campground.image.id"
                  await cloudinary.v2.uploader.destroy(campground.image.id);
                 // after preivious images is removed, new image will be upload to cloudinary
                 // order of tasks are important!! --- use "await" 
                  var result = await cloudinary.v2.uploader.upload(req.file.path);
                    campground.image = {
                        id: result.public_id,
                        url: result.secure_url
                    };
              } catch(err) {
                  req.flash("error", err.message);
                  return res.redirect("back");
              }
            }
            // location
            geocoder.geocode(req.body.location, function (err, data) {
                if (err || !data.length) {
                  req.flash('error', 'Invalid address');
                  return res.redirect('back');
                }
                campground.lat = data[0].latitude;
                campground.lng = data[0].longitude;
                campground.location = data[0].formattedAddress;
                campground.name = req.body.name;
                campground.cost = req.body.cost;
                campground.description = req.body.description;
                campground.save();
                req.flash("success","Successfully Updated!");
                res.redirect("/campgrounds/" + campground._id);
            });
        }
    });
});

// destroy campground route
router.delete('/:id', function(req, res){
  Campground.findById(req.params.id, async function(err, campground) {
    if(err) {
      req.flash("error", err.message);
      return res.redirect("back");
    }
    try {
        await cloudinary.v2.uploader.destroy(campground.image.id);
        // after the image is removed, campground data is removed from DB 
        campground.remove();
        req.flash('success', 'Campground deleted successfully!');
        res.redirect('/campgrounds');
    } catch(err) {
          req.flash("error", err.message);
          return res.redirect("back");
    }
  });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;

