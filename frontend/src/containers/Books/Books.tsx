import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBooksByLetter } from "../../store/Books/BooksActions";
import { RootState } from "../../store/rootReducer";
import { ContainerStyle } from "../../components/HomePage/HomePage.style";
import { BooksTableStyle, BookTableHeaderStyle } from "./Books.style";

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
			<ContainerStyle isBooksSearch={!!books}>
				{error && <div>Insert React Error Boundary</div>}
				{loading && <div>Insert Loading gif</div>}
				{books &&
					books.map((book, i) => {
						return (
							<h3 key={i}>
								There are {book.count} books 📕📗 starting with '{book.letter}'
							</h3>
						);
					})}
			</ContainerStyle>

			{books &&
				books.map((book, i) => {
					return (
						<>
							<BooksTableStyle>
								<BookTableHeaderStyle className='row'>
									<div className='col-2'>cover</div>
									<div className='col-6'>title</div>
									<div className='col-2'>rating</div>
									<div className='col-2'>format</div>
								</BookTableHeaderStyle>
								<br />
								{book.booksLetter.map((book, i) => {
									return (
										<div key={i}>
											<div className='row'>
												<div className='col-2'>
													<img
														src={book.image_url}
														alt={book.title}
														width='50'
													/>
												</div>
												<div className='col-6'>{book.title}</div>
												<div className='col-2'>{book.rating}</div>
												<div className='col-2'>{book.format}</div>
											</div>
											<br />
										</div>
									);
								})}
							</BooksTableStyle>
						</>
					);
				})}
		</>
	);
};

export default Books;
