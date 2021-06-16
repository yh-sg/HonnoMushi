//All dependencies/variables
require('dotenv').config();
const express = require("express"),
    morgan = require("morgan"),
    app = express(),
    PORT = process.env.PORT || 3010,
    cors = require("cors"),
    mongoose = require("mongoose");

//connection
mongoose.connect(
    process.env.MONGODBLOCAL,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        app.listen(PORT, (e) => {
            if (e) console.log("Error in server setup");
            console.log(`App is listening on PORT ${PORT} at ${new Date()}`);
            console.log("Mongodb connected!");;
    })
}).catch(e=>console.log(e));

mongoose.set('useFindAndModify', false);

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

// test
app.get('/', (req, res) => {
    res.status(200);
    res.json({ Hello: "Kitty" });
});

app.use('/', require('./routes/booksRoute'))