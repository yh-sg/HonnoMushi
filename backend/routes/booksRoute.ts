import express, {NextFunction, Request, Response} from "express";
import auth, { UserAuthReq } from "../middleWares/auth";
import Books from "../models/booksModel";
import { HttpStatusCode } from "../utils/constants";
import ErrorResponse from "../utils/expressErrorResponse";
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import fs from 'fs';
import s3 from '../config/s3';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import multer from 'multer';
import { getAllBooksService } from "../services/booksService";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const router = express.Router(),
    URL = 'https://api.nytimes.com/svc/books/v3/reviews.json',
    API_KEY = process.env.API_KEY,
    {fetch} = require("node-fetch"),
    {withQuery} = require("with-query").default,
    upload = multer({dest: "./temp", limits:{fieldSize: 8 * 1024 * 1024 }})

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
router.get("/books" ,async (req:Request<{}, {}, {}, ReqQuery>, res:Response, next:NextFunction):Promise<void> => {
    try {
        const getAllBooks = await getAllBooksService(req.query.page);

        const {total, books, page, limit} = getAllBooks;

        res.status(HttpStatusCode.OK).json({
            count: total,
            booksLetter: books,
            currentPage: Number(page), 
            numberOfPages: Math.ceil(total/limit)
        });
    } catch (e) {
        console.error(e);
        return next(new ErrorResponse("Unable to get books!",HttpStatusCode.BAD_REQUEST));
    }
});

router.get("/books/:letter", async (req:Request<ReqParams, {}, {}, ReqQuery>, res:Response, next:NextFunction):Promise<void> => {
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

        res.status(HttpStatusCode.OK).json({
            letter: letter,
            count: total,
            booksLetter,
            currentPage: Number(page), 
            numberOfPages: Math.ceil(total/limit)
        });
    } catch (e) {
        console.error(e);
        return next(new ErrorResponse(`Unable to get books from alphabet ${letter}`,HttpStatusCode.BAD_REQUEST));
    }
});

//@route book/id
router.get("/book/:id", async (req:Request, res:Response, next:NextFunction):Promise<Response|void> => {

    try {
        let book = await Books.find({ book_id: req.params.id });

        if (!book||book.length===0) return next(new ErrorResponse("Book not found", HttpStatusCode.NOT_FOUND));

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
        return next(new ErrorResponse(`Unable to get book details`, HttpStatusCode.INTERNAL_SERVER_ERROR));
    }
});

router.post('/bookReview', async(req,res,next:NextFunction):Promise<void>=>{
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
        next(e)
    }
})

router.get('/searchBook', async(req:Request<{},{},{},ReqQuery2>,res:Response, next):Promise<void>=>{
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
        console.error(e);
        next(e)
    }
})

router.post('/createBook', auth, upload.single('image_url'),async(req:Request,res:Response, next):Promise<void>=>{

    const authReq = req as UserAuthReq

    if(req.file?.path===undefined) return next(new ErrorResponse('Please update an image', HttpStatusCode.FORBIDDEN));

    const params = {
        Bucket: process.env.BUCKET_NAME as string,
        Body: fs.createReadStream(req.file?.path as string),
        Key: `userAvatar/${req.file?.originalname}`,
    };

    s3.upload(params, async (err:Error, data:ManagedUpload.SendData) => {
        
        console.error(err)

        if(err) return next(new ErrorResponse('Error occured while trying to upload to S3 bucket', HttpStatusCode.BAD_REQUEST));
        
        if(data) fs.unlinkSync(req.file?.path as string); //!Empty temp folder

        console.log(data.Location)

        try {
            const newBook = new Books({...req.body, user: authReq.userId, image_url:params.Key})
            if(req.body.rating > 5 || req.body.rating < 0) return next(new ErrorResponse(`Rating must be between 0 to 5`, HttpStatusCode.BAD_REQUEST));
            
            const savedBook = await newBook.save();
            
            // result.user = req.user.id;
            res.status(HttpStatusCode.CREATED).json({
                savedBook
            })
        } catch (e) {
            console.error(e);
            next(e)
        }   
    })

})

router.put('/updateBook/:id', auth, async(req:Request,res:Response, next):Promise<void>=>{
    try {
        const book = req.body

        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return next(new ErrorResponse(`No such id exist`, HttpStatusCode.BAD_REQUEST));

        await Books.findByIdAndUpdate(req.params.id, book, {new: true})

        const updatedBook = await Books.findById(req.params.id)

        console.log(updatedBook)

        res.status(HttpStatusCode.ACCEPTED).json({updatedBook})

    } catch (e) {
        console.error(e);
        next(e)
    }
})

router.delete('/deleteBook/:id', auth, async(req:Request,res:Response, next):Promise<void>=>{
    try {

        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return next(new ErrorResponse(`No such book exist`, HttpStatusCode.BAD_REQUEST));

        await Books.findByIdAndDelete(req.params.id)

        res.status(HttpStatusCode.NO_CONTENT).json({
            message:"deleted"
        })

    } catch (e) {
        console.error(e);
        next(e)
    }
})

export default router;