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
    image: String,
    description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

Campground.create(
    {
        name: 'Turkey Point',
        image: 'https://recreation-acm.activefederal.com/assetfactory.aspx?did=7656',
        description: 'There is beautiful beach, no bathroom. No water.'
   
    },
    function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log('NEWLY CREATED CAMPGROUND: ');
            console.log(campground);
        }
        });

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

// INDEX - show all campgrounds
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

// CREATE - add new campground to DB
app.post('/campgrounds', function(req, res){
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

//NEW - show form to create new campground
app.get('/campgrounds/new', function(req, res){
    res.render('new');
});

app.get('/campgrounds/:id', function(req, res){
    //find the campground with provided ID
    
    //render show template with that campground
    res.send('This will be the show page one day');
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('YelpCamp Server has started!!!');
});