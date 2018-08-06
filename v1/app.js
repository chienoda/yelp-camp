var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

var campgrounds = [
        {name: 'Pinary', image: 'http://www.env.gov.bc.ca/bcparks/explore/parkpgs/whiskers/whiskers.jpg'},
        {name: 'Turkey Point', image: 'https://recreation-acm.activefederal.com/assetfactory.aspx?did=7656'},
        {name: 'Long Point', image: 'http://vacationingwithkids.com/wp-content/uploads/2014/08/10520895_10154422250285646_5717167271521392684_n-300x224.jpg'},
];

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res){
    //get data from form and add to campground array
    //redirect back to campground page
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res){
    res.render('new');
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('YelpCamp Server has started!!!');
});