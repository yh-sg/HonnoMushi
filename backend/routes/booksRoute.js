const router = require("express").Router(),
    Books = require('../models/booksModel')

//@route books
router.get("/books", async (req, res) => {
    try {
        let books = await Books.find();
        res.status(200).send({
            count: books.length,
            books,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Unable to get books"
        });
    }
});

router.get("/books/:letter", async (req, res) => {
    const limit = 10,
        skip = 10;

    try {
        let booksLetter = await Books.find({ title: new RegExp('^' + req.params.letter, 'i') });

        res.status(200).send({
            letter: req.params.letter,
            count: booksLetter.length,
            booksLetter
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
                authors: e.authors,
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

module.exports = router;