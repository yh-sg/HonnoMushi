import { Reducer } from "redux";
import {
	Books,
	BOOKS_LOADING,
	BOOKS_SUCCESS,
	BOOKS_FAIL,
	DispatchBooksActions,
	BOOK_DELETED,
	BOOK_CREATED,
	BOOK_UPDATED,
} from "./BooksTypes";

export interface BooksState {
	loading: boolean;
	books: Books;
	error: Error;
}

const initialState = {
	loading: false,
	books: { letter: "", count: 0, booksLetter: [] },
	error: {name:"", message:""}
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
			case BOOK_CREATED:{
				return{
					...state,
					books: {booksLetter:[...state.books.booksLetter, action.payload],count:state.books.count}
				}
			}
			case BOOK_UPDATED:{
				return{
					...state,
					books: {booksLetter:state.books.booksLetter.map((book)=>book._id===action.payload._id ? action.payload : book),count:state.books.count}
				}
			}
			case BOOK_DELETED:{
				return{
					...state,
					books: {booksLetter:state.books.booksLetter.filter((book)=>book._id!==action.payload),count:state.books.count}
				}
			}
			default:
				return state;
		}
	};

export default booksReducer;
