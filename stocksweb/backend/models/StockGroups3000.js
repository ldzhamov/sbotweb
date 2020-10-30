const mongoose3000 = require("../connections/russel3000.js");
var mongoose = require('mongoose');

const stockGroupsSchema = new mongoose.Schema({
    fldstatus:{type: Number, required:true},
    fldbalance: {type: Number, required:true},
    fldtotal:{type: Number, required:true},
    fldinvested: {type: Number, required:true},
    fldmonth:{type: String, required:true},
    fldcreatedat: {type: Date, required:true},
    fldupdatedat: {type: Date, required:true, default: Date.now},
    fldstocks: {type: Array, required:true}
});

stockGroupsSchema.statics.getActive = function(){
    return this.model('clstockgroups').findOne({fldstatus:1}).sort({ fldcreatedat: -1 });;
}

module.exports = StockGroups3000 = mongoose3000.model("clstockgroups", stockGroupsSchema);