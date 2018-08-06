var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    var campgrounds = [
        {name: 'Pinary', image: 'http://www.env.gov.bc.ca/bcparks/explore/parkpgs/whiskers/whiskers.jpg'},
        {name: 'Turkey Point', image: 'https://recreation-acm.activefederal.com/assetfactory.aspx?did=7656'},
        {name: 'Long Point', image: 'http://vacationingwithkids.com/wp-content/uploads/2014/08/10520895_10154422250285646_5717167271521392684_n-300x224.jpg'},
        ]
    res.render('campgrounds', {campgrounds: campgrounds});
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('YelpCamp Server has started!!!');
});