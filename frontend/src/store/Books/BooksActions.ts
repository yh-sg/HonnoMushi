import { Dispatch } from "react";
import axios from "axios";
import {
	BOOKS_LOADING,
	BOOKS_SUCCESS,
	BOOKS_FAIL,
	DispatchBooksActions,
} from "./BooksTypes";
import * as api from '../../api'

export const getBooksByLetter =
	(letter: string) => async (dispatch: Dispatch<DispatchBooksActions>):Promise<void> => {
		const booksAPI = await api.fetchBooks(letter)
		try {
			dispatch({
				type: BOOKS_LOADING,
			});

			if (booksAPI.status === 200) {
				// console.log("booksAPI >>> ", booksAPI);
				setTimeout(() => {
					dispatch({
						type: BOOKS_SUCCESS,
						payload: booksAPI.data,
					});
				}, 1000);
			}
		} catch (error) {
			console.log("ERROR >>>> ", error);
			dispatch({
				type: BOOKS_FAIL,
				payload: error,
			});
		}
	};
