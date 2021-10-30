import Books from "../models/booksModel";

export const getAllBooksService = async(page:string) => {
    const limit = 15,
        newPage:number = parseInt(page),
        startIndex = (Number(newPage-1)*limit),
        total = await Books.find().countDocuments(),
        books = await Books.find().sort({title:1}).limit(limit).skip(startIndex);

    return {total, books, page, limit}
}