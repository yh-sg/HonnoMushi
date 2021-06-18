export const BOOKS_LOADING = "BOOKS_LOADING";
export const BOOKS_SUCCESS = "BOOKS_SUCCESS";
export const BOOKS_FAIL = "BOOKS_FAIL";
export const BOOKS_FETCH_ALL = "BOOKS_FETCH_ALL"

type BookLetter = {
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
	genres: string[];
	image_url: string;
};

export type Books = {
	letter?: string;
	count: number;
	booksLetter: BookLetter[];
	currentPage?: number|null
    numberOfPages?: number
};

interface BooksLoading {
	type: typeof BOOKS_LOADING;
}

interface BooksSuccess {
	type: typeof BOOKS_SUCCESS;
	payload: Books;
}

interface BooksFetchAll {
	type: typeof BOOKS_FETCH_ALL;
	payload: Books;
}

interface BooksFail {
	type: typeof BOOKS_FAIL;
	payload: string;
}

export type DispatchBooksActions = BooksLoading | BooksSuccess | BooksFail | BooksFetchAll;
