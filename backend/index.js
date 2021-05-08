//All dependencies/variables
require('dotenv').config();
const express = require("express"),
    morgan = require("morgan"),
    app = express(),
    PORT = parseInt(process.env.PORT) || 3010,
    cors = require("cors")
    mongoose = require("mongoose");

//connection
mongoose.connect(
    process.env.MONGODBLOCAL,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (e)=>{
        if(e) throw e;
        console.log("Mongodb connected!");
    }
)

//mongoose profile schema
const bookSchema = new mongoose.Schema({
    book_id:{
        type: String,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    authors:{
        type: String,
    },
    description:{
        type: String,
    },
    edition:{
        type: String,
    },
    format:{
        type: String,
    },
    pages:{
        type: Number
    },
    rating:{
        type: mongoose.Types.Decimal128
    },
    rating_count:{
        type: Number
    },
    review_count:{
        type: Number
    },
    generes:{
        type: String
    },
    image_url:{
        type: String
    }
})

const Books = mongoose.model("Books", bookSchema)

//@route books
app.get("/books", async(req,res)=>{
    try {
        let books = await Books.find();
        res.status(200).send({
            count: books.length,
            books,
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Unable to get books"
        })
    }
    
})

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

app.get("/book", async(req,res)=>{

})

app.listen(PORT, (e)=>{
    if (e) console.log("Error in server setup")
    console.log(`App is listening on PORT ${PORT} at ${new Date()}`);
})