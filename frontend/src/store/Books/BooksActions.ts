import { Dispatch } from "react";
import axios from "axios";
import {
	BOOKS_LOADING,
	BOOKS_SUCCESS,
	BOOKS_FAIL,
	DispatchBookActions,
} from "./BookTypes";

export const getBooksByLetter =
	(letter: string) => async (dispatch: Dispatch<DispatchBookActions>) => {
		const endpoint = `http://localhost:3010/books/${letter}`;
		try {
			dispatch({
				type: BOOKS_LOADING,
			});

			const booksAPI = await axios.get(endpoint);
			console.log("booksAPI >>> ", booksAPI);

			dispatch({
				type: BOOKS_SUCCESS,
				payload: booksAPI.data,
			});
		} catch (error) {
			console.log("ERROR >>>> ", error);
			dispatch({
				type: BOOKS_FAIL,
				payload: error,
			});
		}
	};
