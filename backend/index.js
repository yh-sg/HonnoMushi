//All dependencies/variables
require('dotenv').config();
const express = require("express"),
    morgan = require("morgan"),
    app = express(),
    PORT = parseInt(process.env.PORT) || 3010,
    cors = require("cors");

app.use(morgan("combined"));

app.listen(PORT, (e)=>{
    if (e) console.log("Error in server setup")
    console.log(`App is listening on PORT ${PORT} at ${new Date()}`);
})