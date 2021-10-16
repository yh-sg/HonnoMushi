import express, {Request, Response} from "express";
import Books from "../models/booksModel";
import { HttpStatusCode } from "../utils/constants";

const router = express.Router(),
    URL = 'https://api.nytimes.com/svc/books/v3/reviews.json',
    API_KEY = process.env.API_KEY,
    {fetch} = require("node-fetch"),
    {withQuery} = require("with-query").default;

    //Import and Export are ES6 features(Next gen JS, selective and save memory) | asynchronous.
    //Require is old school method of importing code from other files | synchronous
    //In Latest node versions you can use destructuring. It will look like above
    //When type defination is clearly define in models, not much type defination needed on here.

    type ReqQuery = { page : string }
    type ReqQuery2 = {searchTitle: string, searchGenres: string}
    type ReqParams = { letter : string } 

    interface IUrl{
        book_title: string, 
        book_author: string, 
        byline: string,
        publication_dt: string,
        summary: string,
        url: string
    }

//@route books
router.get("/books", async (req:Request<{}, {}, {}, ReqQuery>, res:Response):Promise<void> => {
    const {page} = req.query,
        newPage:number = parseInt(page)
    try {
        const limit = 15,
            startIndex = (Number(newPage-1)*limit),
            total = await Books.find().countDocuments(),
            books = await Books.find().sort({title:1}).limit(limit).skip(startIndex);
        res.status(HttpStatusCode.OK).send({
            count: total,
            booksLetter: books,
            currentPage: Number(page), 
            numberOfPages: Math.ceil(total/limit)
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Unable to get books"
        });
    }
});

router.get("/books/:letter", async (req:Request<ReqParams, {}, {}, ReqQuery>, res:Response):Promise<void> => {
    const {page} = req.query,
        {letter}= req.params,
        newPage:number = parseInt(page)

    try {
        const limit = 8,
            startIndex = (Number(newPage-1)*limit),
            total = await Books.find({ 
                title: new RegExp('^' + letter, 'i')
                }).countDocuments(),
            booksLetter = await Books.find({ 
                title: new RegExp('^' + letter, 'i')
                }).sort({title:1}).limit(limit).skip(startIndex)

        res.status(HttpStatusCode.OK).send({
            letter: letter,
            count: total,
            booksLetter,
            currentPage: Number(page), 
            numberOfPages: Math.ceil(total/limit)
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: `Unable to get books from alphabet ${req.params.letter}`
        });
    }
});

//@route book/id
router.get("/book/:id", async (req:Request, res:Response):Promise<Response> => {

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
        return res.status(HttpStatusCode.OK).json({
            message: "book found!",
            book,
            bookFormat
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            message: `Unable to get book details`
        });
    }
});

router.post('/bookReview', async(req,res):Promise<void>=>{
    try {
        const url:string = withQuery(
            URL,
            {
                title: req.query.bookTitle,
                'api-key': API_KEY,
            }
        ),
            resultURL = await (await fetch(url)).json(),
            reviewResult:IUrl[] = resultURL?.results,
            bookReview = reviewResult.map(e=>{
                const {book_title,book_author,byline,publication_dt,summary,url} = e;
                return{
                    title: book_title, 
                    author: book_author, 
                    reviewer: byline,
                    reviewDate: publication_dt,
                    summary: summary,
                    reviewUrl: url
                }
            })

        res.status(HttpStatusCode.OK).json(bookReview)
    } catch (e) {
        res.status(500).json({message:"something went south"})
    }
})

router.get('/searchBook', async(req:Request<{},{},{},ReqQuery2>,res:Response):Promise<void>=>{
    const {searchTitle, searchGenres} = req.query;

    try {
        const allBooks = await Books.find(),
            regexTitle = new RegExp(searchTitle,"i"),
            regexGenres = new RegExp(searchGenres,"i"),
            result = allBooks.filter(e=>(regexTitle.test(e.title)||regexGenres.test(e.genres)))

        res.status(HttpStatusCode.OK).json({
            count: result.length,
            booksLetter: result
            //! For pagination?
        })
    } catch (e) {
        res.status(404).json({message:"Error in searching book"})
    }
})

export default router;