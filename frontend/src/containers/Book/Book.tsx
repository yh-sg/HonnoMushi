import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getBookById } from "../../store/Book/BookAction";
import booksReducer from "../../store/Books/BooksReducer";
import { RootState } from "../../store/rootReducer";

const Book = () => {
	const dispatch = useDispatch();
	const { id } = useParams() as {
		id: string;
	};

	useEffect(() => {
		dispatch(getBookById(id));
	}, []);

	const bookState = useSelector((state: RootState) => state.book);

	const { loading, book, error } = bookState;
	// book.map((b) => console.log(b));

	// console.log(book.genres);
	return (
		<>
			{error && <div>Insert React Error Boundary</div>}
			{loading && <div>Insert Loading gif</div>}
			<h3>Book</h3>
			<h3>{book.genres}</h3>
			{book && (
				<>
					<h3>{book.title}</h3>
					<h3>{book.genres}</h3>
				</>
			)}
		</>
	);
};

export default Book;
