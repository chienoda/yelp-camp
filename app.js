var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose')

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//     {
//         name: 'Turkey Point',
//         image: 'https://recreation-acm.activefederal.com/assetfactory.aspx?did=7656'
        
//     },
//     function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log('NEWLY CREATED CAMPGROUND: ');
//             console.log(campground);
//         }
//         });

var campgrounds = [
        {name: 'Pinary', image: 'http://www.env.gov.bc.ca/bcparks/explore/parkpgs/whiskers/whiskers.jpg'},
        {name: 'Turkey Point', image: 'https://recreation-acm.activefederal.com/assetfactory.aspx?did=7656'},
        {name: 'Long Point', image: 'http://vacationingwithkids.com/wp-content/uploads/2014/08/10520895_10154422250285646_5717167271521392684_n-300x224.jpg'},
        {name: 'Pinary', image: 'http://www.env.gov.bc.ca/bcparks/explore/parkpgs/whiskers/whiskers.jpg'},
        {name: 'Turkey Point', image: 'https://recreation-acm.activefederal.com/assetfactory.aspx?did=7656'},
        {name: 'Long Point', image: 'http://vacationingwithkids.com/wp-content/uploads/2014/08/10520895_10154422250285646_5717167271521392684_n-300x224.jpg'},
        {name: 'Pinary', image: 'http://www.env.gov.bc.ca/bcparks/explore/parkpgs/whiskers/whiskers.jpg'},
        {name: 'Turkey Point', image: 'https://recreation-acm.activefederal.com/assetfactory.aspx?did=7656'},
        {name: 'Long Point', image: 'http://vacationingwithkids.com/wp-content/uploads/2014/08/10520895_10154422250285646_5717167271521392684_n-300x224.jpg'},
        {name: 'Pinary', image: 'http://www.env.gov.bc.ca/bcparks/explore/parkpgs/whiskers/whiskers.jpg'},
        {name: 'Turkey Point', image: 'https://recreation-acm.activefederal.com/assetfactory.aspx?did=7656'},
        {name: 'Long Point', image: 'http://vacationingwithkids.com/wp-content/uploads/2014/08/10520895_10154422250285646_5717167271521392684_n-300x224.jpg'},
        {name: 'Pinary', image: 'http://www.env.gov.bc.ca/bcparks/explore/parkpgs/whiskers/whiskers.jpg'},
        {name: 'Turkey Point', image: 'https://recreation-acm.activefederal.com/assetfactory.aspx?did=7656'},
        {name: 'Long Point', image: 'http://vacationingwithkids.com/wp-content/uploads/2014/08/10520895_10154422250285646_5717167271521392684_n-300x224.jpg'},
];

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds', {campgrounds: allCampgrounds});
        }
    });
});

app.post('/campgrounds', function(req, res){
    // get data from form and add to campground array
    // redirect back to campground page
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    // create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

app.get('/campgrounds/new', function(req, res){
    res.render('new');
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('YelpCamp Server has started!!!');
});