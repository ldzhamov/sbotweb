var mongoose = require('mongoose');
require("dotenv").config();

// mongoose.createConnection(
//     process.env.MONGODB_CONNECTION_500,
//     {
//         useNewUrlParser:true,
//         useUnifiedTopology:true
//     },
//     (err) => {
//         if (err) throw err;
//         console.log("Mongodb SP500 connection established");
//     }
// );

module.exports = mongoose.createConnection(
    process.env.MONGODB_CONNECTION_500,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    },
    (err) => {
        if (err) throw err;
        console.log("Mongodb SP500 connection established");
    }
);