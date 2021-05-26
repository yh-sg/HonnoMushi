import { Dispatch } from "redux";
import axios from "axios";
import {
	BOOK_FAIL,
	BOOK_LOADING,
	BOOK_SUCCESS,
	DispatchBookAction,
} from "./BookType";

export const getBookById =
	(id: string) => async (dispatch: Dispatch<DispatchBookAction>) => {
		const endpoint = `http://localhost:3010/book/${id}`;

		try {
			dispatch({
				type: BOOK_LOADING,
			});

			const bookAPI = await axios.get(endpoint);

			if (bookAPI.status === 200) {
				console.log("bookAPI >>> ", bookAPI);
				dispatch({
					type: BOOK_SUCCESS,
					payload: bookAPI.data,
				});
			}
		} catch (error) {
			console.log("ERROR >>>> ", error);
			dispatch({
				type: BOOK_FAIL,
				payload: error,
			});
		}
	};
