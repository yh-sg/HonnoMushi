import { combineReducers } from "redux";
import booksReducer from "./Books/BooksReducer";
import bookReducer from "./Book/BookReducer";

export const rootReducer = combineReducers({
	allBooks: booksReducer,
	book: bookReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
