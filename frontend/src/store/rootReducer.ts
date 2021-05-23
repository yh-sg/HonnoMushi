import { combineReducers } from "redux";
import booksReducer from "./Books/BooksReducer";

export const rootReducer = combineReducers({
	allBooks: booksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
