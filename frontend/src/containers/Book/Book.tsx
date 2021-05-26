import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getBookById } from "../../store/Book/BookAction";

const Book = () => {
	const dispatch = useDispatch();
	const { id } = useParams() as {
		id: string;
	};

	useEffect(() => {
		dispatch(getBookById(id));
	}, []);
	return (
		<>
			<h3>Book</h3>
		</>
	);
};

export default Book;
