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

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

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
        type: Number
    },
    rating_count:{
        type: Number
    },
    review_count:{
        type: Number
    },
    genres:{
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

app.get("/books/:letter", async(req,res)=>{
    const limit=10,
        skip = 10;

    try {
        // let booksLetter = await Books.find({"title": /^T/i});
        // let booksLetter = await Books.find({ title: { $regex: "/^" + req.params.letter + "/" }});
        let booksLetter = await Books.find({title: new RegExp('^' + req.params.letter, 'i')});

        
        res.status(200).send({
            letter: req.params.letter,
            count: booksLetter.length,
            booksLetter
            
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: `Unable to get books from alphabet ${req.params.letter}`
        })
    }
})

//@route books/letter
app.get("/books/:letter", async(req,res)=>{
    const limit=10,
        skip = 10;

    try {
        // let booksLetter = await Books.find({"title": /^T/i});
        // let booksLetter = await Books.find({ title: { $regex: "/^" + req.params.letter + "/" }});
        let booksLetter = await Books.find({title: new RegExp('^' + req.params.letter, 'i')});

        
        res.status(200).send({
            letter: req.params.letter,
            count: booksLetter.length,
            booksLetter
            
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: `Unable to get books from alphabet ${req.params.letter}`
        })
    }
})

//@route book/id
app.get("/book/:id",async(req,res)=>{
    
    try {
        let book = await Books.find({book_id: req.params.id});
            // regex = /[|]/g,
            // bookResult = book[0];

            // bookResult.authors = bookResult.authors.replace(regex,", ")
            // bookResult.genres = bookResult.genres.replace(regex,", ")


        if(!book){
            return res.status(400).json({message:"Book not found"})
        }

        //only take what we wanted^^
        let bookFormat = book.map(e=>{
            return{
                bookId: e.book_id,
                title: e.title,
                authors: e.authors,
                authors: e.authors.split("|"),
                summary: e.description,
                pages: e.pages,
                rating: e.rating,
                ratingCount: e.rating_count,
                image_url: e.image_url,
                genres: e.genres.split("|"),
            }
        })
        res.status(200).json({
            message: "book found!",
            book,
            bookFormat
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: `Unable to get book details`
        })
    }
})

app.listen(PORT, (e)=>{
    if (e) console.log("Error in server setup")
    console.log(`App is listening on PORT ${PORT} at ${new Date()}`);
})