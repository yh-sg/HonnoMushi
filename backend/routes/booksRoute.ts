import express, {NextFunction, Request, Response} from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import multer from 'multer';

import Books from "../models/booksModel";
import ErrorResponse from "../utils/expressErrorResponse";
import auth, { UserAuthReq } from "../middleWares/auth";
import { HttpStatusCode } from "../utils/constants";
import { getAllBooksService, getBooksByLetterService, getOneBookService, searchBookService, serachBookReviewService, s3UploadImageService } from "../services/booksService";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const router = express.Router(),
    upload = multer({
        dest: "./temp",
        limits:{fieldSize: 8 * 1024 * 1024},
        fileFilter:(req,file,cb) => {
            const allowedMimes = [
                "image/jpeg",
                "image/jpg",
                "image/png"
            ];
            if (allowedMimes.includes(file.mimetype)) {
                cb(null, true);
            }else {
                cb(new Error("Invalid file type please upload jpeg,jpg or png"));
            }
        },
    })

    //Import and Export are ES6 features(Next gen JS, selective and save memory) | asynchronous.
    //Require is old school method of importing code from other files | synchronous
    //When type defination is clearly define in models, not much type defination needed on here.

//@route books
router.get("/books" ,async (req:Request<{}, {}, {}, { page : string }>, res:Response, next:NextFunction):Promise<void> => {
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

router.get("/books/:letter", async (req:Request<{ letter : string } , {}, {}, { page : string }>, res:Response, next:NextFunction):Promise<void> => {

    try {
        const allBooksLetterResult = await getBooksByLetterService(req.query.page,req.params.letter)

        const {letter, total, booksLetter, page, limit}  = allBooksLetterResult;

        res.status(HttpStatusCode.OK).json({
            letter: letter,
            count: total,
            booksLetter,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total/limit)
        });
    } catch (e) {
        console.error(e);
        return next(new ErrorResponse(`Unable to get books from alphabet ${req.params.letter}`,HttpStatusCode.BAD_REQUEST));
    }
});

//@route book/id
router.get("/book/:id", async (req:Request, res:Response, next:NextFunction):Promise<Response|void> => {

    try {
        const getOneBookResult = await getOneBookService(req.params.id)

        if(getOneBookResult instanceof ErrorResponse) return next(getOneBookResult)

        const {book, bookFormat} = getOneBookResult

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

router.get('/searchBook', async(req:Request<{},{},{},{searchTitle: string, searchGenres: string}>,res:Response, next):Promise<void>=>{
    const {searchTitle, searchGenres} = req.query;

    try {
        const searchBookResult = await searchBookService(searchTitle,searchGenres)

        res.status(HttpStatusCode.OK).json({
            count: searchBookResult.length,
            booksLetter: searchBookResult
        })
    } catch (e) {
        console.error(e);
        next(e)
    }
})

router.post('/createBook', auth, upload.single('image_url'),async(req:Request,res:Response, next):Promise<void>=>{

    const authReq = req as UserAuthReq

    const s3UploadResult = await s3UploadImageService(req.file?.path, req.file?.originalname)

    if(s3UploadResult instanceof ErrorResponse) return next(s3UploadResult)

    try {
        const newBook = new Books({...req.body, user: authReq.userId, image_url:s3UploadResult})
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

router.put('/updateBook/:id', auth, async(req:Request,res:Response, next):Promise<void>=>{
    try {
        const book = req.body

        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return next(new ErrorResponse(`No such id exist`, HttpStatusCode.BAD_REQUEST));

        await Books.findByIdAndUpdate(req.params.id, book, {new: true})

        const updatedBook = await Books.findById(req.params.id)

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

router.post('/bookReview', async(req:Request<{},{},{},{bookTitle:string}>,res,next:NextFunction):Promise<void>=>{
    try {
        const bookReviewResult = await serachBookReviewService(req.query.bookTitle);

        res.status(HttpStatusCode.OK).json(bookReviewResult)
    } catch (e) {
        next(e)
    }
})

export default router;