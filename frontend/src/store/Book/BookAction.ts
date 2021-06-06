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
		const endpoint = `http://localhost:8080/book/${id}`;

		try {
			const bookAPI = await axios.get(endpoint);

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
				payload: error,
			});
		}
	};
