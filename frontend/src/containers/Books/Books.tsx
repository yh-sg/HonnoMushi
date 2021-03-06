import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { getBooksByLetter } from "../../store/Books/BooksActions";
import { RootState } from "../../store/rootReducer";
import { ContainerStyle } from "../../components/HomePage/HomePage.style";
import Pagination from "../Pagination/Pagination";
import BookContent from "./BookContent";
import { BooksHeaderFontStyle } from "./Books.style";

const useQuery = (): URLSearchParams => {
	return new URLSearchParams(useLocation().search);
};

const Books: React.FC = (): React.ReactElement => {
	const dispatch = useDispatch();
	const { alphabet } = useParams() as {
		alphabet: string;
	};
	const query = useQuery();
	const page = query.get(`page`) || 1;

	useEffect(() => {
		dispatch(getBooksByLetter(alphabet, page));
	}, []);

	const allBooksState = useSelector((state: RootState) => state.allBooks),
		{ books, error, loading } = allBooksState,
		{ letter, count, booksLetter } = books;

	return (
		<>
			<ContainerStyle
				isBooksSearching={!!books}
				count={count}
				loading={loading}
			>
				{error && <div>Insert React Error Boundary</div>}
				{loading && <Spinner animation='border' variant='warning' />}
				{!loading && books && (
					<BooksHeaderFontStyle>
						There {count === 1 ? "is 1 book" : `are ${count} books`} 📕 📗
						starting with '{letter}'
					</BooksHeaderFontStyle>
				)}
			</ContainerStyle>

			{!loading && letter && books && (
				<BookContent booksLetter={booksLetter} count={count} />
			)}
			<Pagination page={page} alphabet={alphabet} />
		</>
	);
};

export default Books;
