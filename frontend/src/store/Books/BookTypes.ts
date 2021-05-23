export const BOOKS_LOADING = "BOOK_LOADING";
export const BOOKS_SUCCESS = "BOOK_SUCCESS";
export const BOOKS_FAIL = "BOOK_FAIL";

export type Books = {
	letter: string;
	count: number;
	booksLetter: object[];
};

export type Book = {
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
