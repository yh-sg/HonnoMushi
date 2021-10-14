import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getAllBooks, searchBooks } from "../../store/Books/BooksActions";
import { RootState } from "../../store/rootReducer";
import { Spinner } from "react-bootstrap";
import {
	ContainerStyle,
	SearchBookStyle,
} from "../../components/HomePage/HomePage.style";
import Pagination from "../Pagination/Pagination";
import BookContent from "./BookContent";

const useQuery = (): URLSearchParams => {
	return new URLSearchParams(useLocation().search);
};

const AllBooks: React.FC = (): React.ReactElement => {
	const dispatch = useDispatch(),
		query = useQuery(),
		page = query.get(`page`) || 1,
		searchTitle = query.get(`searchTitle`),
		history = useHistory(),
		[search, setSearch] = useState<string>("");

	useEffect(() => {
		if (query.has("searchTitle")) {
			query.delete("searchTitle");
			query.delete("searchGenres");
			history.replace({
				search: query.toString(),
			});
		}
		dispatch(getAllBooks(page));
	}, [dispatch, history, page]); // don't add query. will keep refreshing and making server calls

	const { loading, books, error } = useSelector(
			(state: RootState) => state.allBooks
		),
		{ count, booksLetter } = books;

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === "Enter") {
			searchAllBooks();
			setSearch("");
		}
	};

	const searchAllBooks = (): void => {
		if (search.trim()) {
			dispatch(searchBooks(search, "none"));
			history.push(
				`/books?searchTitle=${search || "none"}&searchGenres=${"none"}`
			);
		} else {
			history.push("/books");
		}
	};

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
					<h3>
						There {count === 1 ? "is 1 book 📗" : `are ${count} books 📚`}
					</h3>
				)}
				<SearchBookStyle
					name='search'
					value={search}
					placeholder='Search for a book'
					onChange={(e) => setSearch(e.target.value)}
					onKeyPress={handleKeyPress}
				/>
			</ContainerStyle>

			{!loading && books && (
				<BookContent booksLetter={booksLetter} count={count} />
			)}
			{!searchTitle && <Pagination page={page} />}
		</>
	);
};

export default AllBooks;
