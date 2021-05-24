import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { getBooksByLetter } from "../../store/Books/BooksActions";
import { RootState } from "../../store/rootReducer";

const Books: React.FC = () => {
	const { letter } = useParams() as {
		letter: string;
	};

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBooksByLetter(letter));
	}, []);

	const allBooksState = useSelector((state: RootState) => state.allBooks);
	const { books, error, loading } = allBooksState;
	console.log("allBookState -->", allBooksState);

	return (
		<>
			{error && <div>Insert React Error Boundary</div>}
			{loading && <div>Insert Loading gif</div>}
			{books &&
				books.map((book, i) => {
					return (
						<>
							<h3>
								There are {book.count} books 📕📗 starting with '{book.letter}'
							</h3>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th></th>
										<th>Title</th>
										<th>Rating</th>
										<th>Format</th>
									</tr>
								</thead>
								{book.booksLetter.map((books, i) => {
									return (
										<tbody>
											<tr>
												<img
													src={books.image_url}
													alt={books.title}
													width='100'
												/>
												<td>{books.title}</td>
												<td>{books.rating}</td>
												<td>{books.format}</td>
											</tr>
										</tbody>
									);
								})}
							</Table>
						</>
					);
				})}
		</>
	);
};

export default Books;
