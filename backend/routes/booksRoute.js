const router = require("express").Router(),
    Books = require('../models/booksModel'),
    URL = 'https://api.nytimes.com/svc/books/v3/reviews.json',
    API_KEY = process.env.API_KEY,
    fetch = require("node-fetch"),
    withQuery = require("with-query").default

//@route books
router.get("/books", async (req, res) => {
    const {page} = req.query;
    try {
        const limit = 15,
            startIndex = (Number(page-1)*limit),
            total = await Books.find().count(),
            books = await Books.find().sort({title:1}).limit(limit).skip(startIndex);
        res.status(200).send({
            count: total,
            booksLetter: books,
            currentPage: Number(page), 
            numberOfPages: Math.ceil(total/limit)
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Unable to get books"
        });
    }
});

router.get("/books/:letter", async (req, res) => {
    const {page} = req.query

    try {
        const limit = 8,
            startIndex = (Number(page-1)*limit),
            total = await Books.find({ 
                title: new RegExp('^' + req.params.letter, 'i')
                }).count(),
            booksLetter = await Books.find({ 
                title: new RegExp('^' + req.params.letter, 'i')
                }).sort({title:1}).limit(limit).skip(startIndex)

        res.status(200).send({
            letter: req.params.letter,
            count: total,
            booksLetter,
            currentPage: Number(page), 
            numberOfPages: Math.ceil(total/limit)
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: `Unable to get books from alphabet ${req.params.letter}`
        });
    }
});

//@route book/id
router.get("/book/:id", async (req, res) => {

    try {
        let book = await Books.find({ book_id: req.params.id });

        if (!book) {
            return res.status(400).json({ message: "Book not found" });
        }

        //only take what we wanted^^
        let bookFormat = book.map(e => {
            return {
                bookId: e.book_id,
                title: e.title,
                authors: e.authors.split("|"),
                summary: e.description,
                pages: e.pages,
                rating: e.rating,
                ratingCount: e.rating_count,
                image_url: e.image_url,
                genres: e.genres.split("|"),
            };
        });
        res.status(200).json({
            message: "book found!",
            book,
            bookFormat
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: `Unable to get book details`
        });
    }
});

router.post('/bookReview', async(req,res)=>{
    try {
        const url = withQuery(
            URL,
            {
                title: req.query.bookTitle,
                'api-key': API_KEY,
            }
        ),
            resultURL = await (await fetch(url)).json(),
            bookReview = resultURL.results.map(e=>{
                return{
                    title: e.book_title, 
                    author: e.book_author, 
                    reviewer: e.byline,
                    reviewDate: e.publication_dt,
                    summary: e.summary,
                    reviewUrl: e.url
                }
            })

        res.status(200).json(bookReview)
    } catch (e) {
        res.status(500).json({message:"something went south"})
    }
})

router.get('/searchBook', async(req,res)=>{
    const {searchTitle, searchGenres} = req.query;

    try {
        const allBooks = await Books.find(),
            regexTitle = new RegExp([searchTitle],"i"),
            regexGenres = new RegExp([searchGenres],"i"),
            result = allBooks.filter(e=>(regexTitle.test(e.title)||regexGenres.test(e.genres)))

        res.status(200).json({
            count: result.length,
            booksLetter: result
            //! For pagination?
        })
    } catch (e) {
        res.status(404).json({message:e.message})
    }
})

module.exports = router;