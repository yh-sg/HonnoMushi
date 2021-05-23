import { combineReducers } from "redux";
import booksReducer from "./Books/BooksReducer";

export const rootReducer = combineReducers({
	books: booksReducer,
});