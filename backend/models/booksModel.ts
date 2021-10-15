import { Schema, model, Document } from 'mongoose';

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
    image_url: string
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
    },
    description: {
        type: String,
    },
    edition: {
        type: String,
    },
    format: {
        type: String,
    },
    pages: {
        type: Number
    },
    rating: {
        type: Number
    },
    rating_count: {
        type: Number
    },
    review_count: {
        type: Number
    },
    genres: {
        type: String
    },
    image_url: {
        type: String
    }
});

const Books = model<IBook>("Books", bookSchema);

export default Books;