import { Dispatch } from "react";
import {
	BOOKS_LOADING,
	BOOKS_SUCCESS,
	BOOKS_FAIL,
	DispatchBooksActions,
} from "./BooksTypes";
import * as api from '../../api'

export const getBooksByLetter =
	(letter: string,page: string|number) => async (dispatch: Dispatch<DispatchBooksActions>):Promise<void> => {
		const booksAPI = await api.fetchBooks(letter,page)
		try {
			dispatch({
				type: BOOKS_LOADING,
			});

			if (booksAPI.status === 200) {
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
	},

	getAllBooks = (page:string|number) => async(dispatch: Dispatch<DispatchBooksActions>):Promise<void> => {
		const {data, status} = await api.fetchAllBooks(page)
		try {
			dispatch({
				type: BOOKS_LOADING,
			});

			if (status === 200) {
				dispatch({
					type: BOOKS_SUCCESS,
					payload: data,
				});
			}

		} catch (e) {
			console.log("ERROR >>>> ", e);
			dispatch({
				type: BOOKS_FAIL,
				payload: e,
			});
		}
	}
