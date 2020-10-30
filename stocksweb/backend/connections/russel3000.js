var mongoose = require('mongoose');
require("dotenv").config();



module.exports = mongoose.createConnection(
    process.env.MONGODB_CONNECTION,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    },
    (err) => {
        if (err) throw err;
        console.log("Mongodb connection established");
    }
);