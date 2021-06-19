import { Reducer } from "redux";
import {
	Books,
	BOOKS_LOADING,
	BOOKS_SUCCESS,
	BOOKS_FAIL,
	DispatchBooksActions,
	BOOKS_FETCH_ALL,
} from "./BooksTypes";

export interface BooksState {
	loading: boolean;
	books: Books;
	error: string;
}

const initialState = {
	loading: false,
	books: { letter: "", count: 0, booksLetter: [] },
	error: "",
};

const booksReducer:Reducer<BooksState,DispatchBooksActions> = (
	state: BooksState = initialState,
	action: DispatchBooksActions
	): BooksState => {
		switch (action.type) {
			case BOOKS_LOADING: {
				return {
					...state,
					loading: true,
				};
			}
			case BOOKS_SUCCESS:
			case BOOKS_FETCH_ALL:	
			{
				return {
					...state,
					loading: false,
					books: action.payload,
				};
			}
			case BOOKS_FAIL: {
				return {
					...state,
					error: action.payload,
				};
			}
			default:
				return state;
		}
	};

export default booksReducer;
