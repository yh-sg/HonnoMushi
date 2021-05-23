import {
	Books,
	BOOKS_LOADING,
	BOOKS_SUCCESS,
	BOOKS_FAIL,
	DispatchBookActions,
} from "./BookTypes";

export interface BooksState {
	loading: boolean;
	books: Books[] | null;
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
				loading: true,
			};
		}
		case BOOKS_SUCCESS: {
			return {
				...state,
				loading: false,
				books: action.payload,
			};
		}
		case BOOKS_FAIL: {
			return {
				...state,
				error: action.payload,
			};
		}
		default:
			return state;
	}
};

export default booksReducer;
