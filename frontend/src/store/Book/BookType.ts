import { AxiosError } from "axios";

export const BOOK_LOADING = "BOOK_LOADING";
export const BOOK_SUCCESS = "BOOK_SUCCESS";
export const BOOK_FAIL = "BOOK_FAIL";

type BookFormat = {
	book_id: string;
	title: string;
	authors: string[];
	summary: string;
	pages: number;
	rating: number;
	ratingCount: number;
	image_url: string;
	genres: string[];
};

export type Book = {
	message: string;
	book: BookFormat[];
	bookFormat: BookFormat[];
};

export interface BookLoading {
	type: typeof BOOK_LOADING;
}

export interface BookSuccess {
	type: typeof BOOK_SUCCESS;
	payload: Book;
}

export interface BookFail {
	type: typeof BOOK_FAIL;
	payload: AxiosError<string>;
}

export type DispatchBookAction = BookLoading | BookSuccess | BookFail;
