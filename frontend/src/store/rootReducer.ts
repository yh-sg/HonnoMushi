import { combineReducers } from "redux";
import booksReducer from "./Books/BooksReducer";
import bookReducer from "./Book/BookReducer";
import authReducer from "./Auth/AuthReducer";

export const rootReducer = combineReducers({
	allBooks: booksReducer,
	book: bookReducer,
	auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
