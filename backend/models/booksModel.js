const mongoose = require("mongoose");

//mongoose profile schema
const bookSchema = new mongoose.Schema({
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

const Books = mongoose.model("Books", bookSchema);

module.exports = Books;