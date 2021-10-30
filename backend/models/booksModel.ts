import { Schema, model, Document } from 'mongoose';
import User from './userModel';

export interface IBook extends Document{
    book_id:string,
    title:string,
    authors:string,
    description:string,
    edition:string,
    format: string,
    pages:number,
    rating:number,
    rating_count:number,
    review_count:number,
    genres:string,
    image_url: string,
    user: String
}

//mongoose profile schema
const bookSchema = new Schema<IBook>({
    book_id: {
        type: String,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    authors: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    edition: {
        type: String,
    },
    format: {
        type: String,
    },
    pages: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 4
    },
    rating_count: {
        type: Number,
        default:0
    },
    review_count: {
        type: Number,
        default:0
    },
    genres: {
        type: String,
        required: true
    },
    image_url: {
        type: String
    },
    user:{   
        type: Schema.Types.ObjectId, 
        ref: User
    }
});

const Books = model<IBook>("Books", bookSchema);

export default Books;