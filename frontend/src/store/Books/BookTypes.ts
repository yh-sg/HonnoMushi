export const BOOKS_LOADING = "BOOK_LOADING";
export const BOOKS_SUCCESS = "BOOK_SUCCESS";
export const BOOKS_FAIL = "BOOK_FAIL";

export type Books = {
	letter: string;
	count: number;
	booksLetter: Book[];
};

// authors: "Laura Thalassa";
// book_id: "c170607a";
// description: "They";
// edition: "2nd Edition";
// format: "Paperback";
// genres: "Romance|Fantasy|New Adult|Fantasy|Paranormal|Romance|Paranormal Romance|Science Fiction|Dystopia";
// image_url: "https://images.gr-assets.com/books/1537316666l/37769929.jpg";
// pages: 381;
// rating: 4.06;
// rating_count: 13671;
// review_count: 1886;
// title: "Pestilence";
// _id: "6095f2e31eb6a85a10c5a954";

type Book = {
	_id: string;
	book_id: string;
	title: string;
	authors: string;
	description: string;
	edition: string;
	format: string;
	pages: number;
	rating: number;
	rating_count: number;
	review_count: number;
	genres: string;
	image_url: string;
};

interface BooksLoading {
	type: typeof BOOKS_LOADING;
}

interface BooksSuccess {
	type: typeof BOOKS_SUCCESS;
	payload: Books;
}

interface BooksFail {
	type: typeof BOOKS_FAIL;
	payload: string;
}

export type DispatchBookActions = BooksLoading | BooksSuccess | BooksFail;
