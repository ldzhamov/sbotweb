const mongoose3000 = require("../connections/russel3000.js");
var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:{type: String, required:true, unique:true},
    password: {type: String, required:true, minlength:5}
});

module.exports = User = mongoose3000.model("clusers", userSchema);