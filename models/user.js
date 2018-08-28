var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchemna = new mongoose.Schema({
    username: String,
    password: String,
    avatar : String,
    firstName: String,
    lastName: String,
    isAdmin: {type: Boolean, default: false}
});

UserSchemna.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchemna);
