const mongoose500 = require("../connections/sp500.js");
var mongoose = require('mongoose');

const stockGroups500Schema = new mongoose.Schema({
    fldstatus:{type: Number, required:true},
    fldbalance: {type: Number, required:true},
    fldtotal:{type: Number, required:true},
    fldinvested: {type: Number, required:true},
    fldmonth:{type: String, required:true},
    fldcreatedat: {type: Date, required:true},
    fldupdatedat: {type: Date, required:true, default: Date.now},
    fldstocks: {type: Array, required:true}
});

stockGroups500Schema.statics.getActive = function(){
    return this.model('clstockgroups').findOne({fldstatus:1}).sort({ fldcreatedat: -1 });;
}

module.exports = StockGroups500 = mongoose500.model("clstockgroups", stockGroups500Schema);