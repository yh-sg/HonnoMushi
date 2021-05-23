import {
	Books,
	BOOKS_LOADING,
	BOOKS_SUCCESS,
	BOOKS_FAIL,
	DispatchBookActions,
} from "./BookTypes";

interface BooksState {
	loading: boolean;
	books: Books | null;
	error: string;
}

const initialState = {
	loading: false,
	books: null,
	error: "",
};

const booksReducer = (
	state: BooksState = initialState,
	action: DispatchBookActions
) => {
	switch (action.type) {
		case BOOKS_LOADING: {
			return {
				...state,
				loading: true,
			};
		}
		case BOOKS_SUCCESS: {
			return {
				...state,
				payload: action.payload,
			};
		}
		case BOOKS_FAIL: {
			return {
				...state,
				loading: false,
				books: null,
				error: action.payload,
			};
		}
		default:
			return state;
	}
};

export default booksReducer;
