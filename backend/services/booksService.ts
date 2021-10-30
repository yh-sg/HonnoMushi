import Books from "../models/booksModel";
import { HttpStatusCode } from "../utils/constants";
import ErrorResponse from "../utils/expressErrorResponse";
import dotenv from 'dotenv';
import fs from 'fs';
import s3 from '../config/s3';
import { ManagedUpload } from 'aws-sdk/clients/s3';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

interface IUrl{
    book_title: string, 
    book_author: string, 
    byline: string,
    publication_dt: string,
    summary: string,
    url: string
}

const URL = 'https://api.nytimes.com/svc/books/v3/reviews.json',
    API_KEY = process.env.API_KEY,
    fetch = require("node-fetch"),
    withQuery = require("with-query").default;

export const getAllBooksService = async(page:string) => {
    const limit = 15,
        newPage:number = parseInt(page),
        startIndex = (Number(newPage-1)*limit),
        total = await Books.find().countDocuments(),
        books = await Books.find().sort({title:1}).limit(limit).skip(startIndex);

    return {total, books, page, limit}
}

export const getBooksByLetterService = async(page:string, letter:string) => {
    const limit = 8,
        newPage:number = parseInt(page),
        startIndex = (Number(newPage-1)*limit),
        total = await Books.find({ 
            title: new RegExp('^' + letter, 'i')
            }).countDocuments(),
        booksLetter = await Books.find({ 
            title: new RegExp('^' + letter, 'i')
            }).sort({title:1}).limit(limit).skip(startIndex)

        return {letter, total, booksLetter, page, limit}
}

export const getOneBookService = async(id:string) => {
    let book = await Books.find({ book_id: id });

    if (!book||book.length===0) return new ErrorResponse("Book not found", HttpStatusCode.NOT_FOUND);

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

    return {book,bookFormat}
}

export const searchBookService = async(searchTitle:string, searchGenres:string) => {
    const allBooks = await Books.find(),
    regexTitle = new RegExp(searchTitle,"i"),
    regexGenres = new RegExp(searchGenres,"i"),
    result = allBooks.filter(e=>(regexTitle.test(e.title)||regexGenres.test(e.genres)))

    return result
}

export const serachBookReviewService = async(bookTitle:string) => {
    const url:string = withQuery(
        URL,
        {
            title: bookTitle,
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

        return bookReview
}

export const s3UploadImageService = async(filePath:string | undefined, originalName:string | undefined) => {
    if(filePath===undefined) return new ErrorResponse('Please update an image', HttpStatusCode.FORBIDDEN);

    const params = {
        Bucket: process.env.BUCKET_NAME as string,
        Body: fs.createReadStream(filePath as string),
        Key: `public/${originalName}`,
    };

    s3.upload(params, async(err:Error, data:ManagedUpload.SendData) => {
        
        console.error(err)

        if(err) return new ErrorResponse('Error occured while trying to upload to S3 bucket', HttpStatusCode.BAD_REQUEST);
        
        if(data) fs.unlinkSync(filePath as string); //!Empty temp folder

        console.log(data.Location)
        console.log("File uploaded successfully!");
    })

    return params.Key
}