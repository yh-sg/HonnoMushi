import { Dispatch } from "redux";
import {
	BOOK_FAIL,
	BOOK_LOADING,
	BOOK_SUCCESS,
	DispatchBookAction,
} from "./BookType";
import * as api from '../../api'
import { AxiosError } from "axios";

export const getBookById =
	(id: string) => async (dispatch: Dispatch<DispatchBookAction>):Promise<void> => {

		try {
			const bookAPI = await api.fetchBook(id);

			dispatch({
				type: BOOK_LOADING,
			});

			if (bookAPI.status === 200) {
				// console.log("bookAPI >>> ", bookAPI);
				setTimeout(() => {
					dispatch({
						type: BOOK_SUCCESS,
						payload: bookAPI.data,
					});
				}, 1000);
			}
		} catch (error) {
			console.log("ERROR >>>> ", error);
			dispatch({
				type: BOOK_FAIL,
				payload: error.response.data.message as AxiosError<string>,
			});
		}
	};
