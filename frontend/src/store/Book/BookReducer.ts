import {
	BookFormat,
	BOOK_FAIL,
	BOOK_LOADING,
	BOOK_SUCCESS,
	DispatchBookAction,
} from "./BookType";

interface BookState {
	loading: boolean;
	book: BookFormat;
	error: string;
}

const initialState = {
	loading: false,
	book: {
		book_id: "",
		title: "",
		authors: [],
		summary: "",
		pages: 0,
		rating: 0,
		ratingCount: 0,
		image_url: "",
		genres: [],
	},
	error: "",
};

const bookReducer = (
	state: BookState = initialState,
	action: DispatchBookAction
): BookState => {
	switch (action.type) {
		case BOOK_LOADING: {
			return {
				...state,
				loading: true,
			};
		}
		case BOOK_SUCCESS: {
			return {
				...state,
				loading: false,
				book: action.payload,
			};
		}
		case BOOK_FAIL: {
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		}
		default:
			return state;
	}
};

export default bookReducer;
