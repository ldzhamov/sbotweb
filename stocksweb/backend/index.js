const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app =  express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));


//routes
app.use("/users", require("./routes/User"));
app.use("/stocks", require("./routes/Stocks"));