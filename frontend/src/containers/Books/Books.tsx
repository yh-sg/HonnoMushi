import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getBooksByLetter } from "../../store/Books/BooksActions";
import { RootState } from "../../store/rootReducer";
import { ContainerStyle } from "../../components/HomePage/HomePage.style";
import {
	BooksTableStyle,
	BooksTableHeaderStyle,
	BooksImageStyle,
	BooksTitleStyle,
} from "./Books.style";

const Books: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { letter } = useParams() as {
		letter: string;
	};

	useEffect(() => {
		dispatch(getBooksByLetter(letter));
	}, []);

	const allBooksState = useSelector((state: RootState) => state.allBooks);
	const { books, error, loading } = allBooksState;
	// console.log("allBookState -->", allBooksState);

	return (
		<>
			<ContainerStyle isBooksSearch={!!books}>
				{error && <div>Insert React Error Boundary</div>}
				{loading && <div>Insert Loading gif</div>}
				{books &&
					books.map((book, i) => {
						return (
							<h3 key={i}>
								There{" "}
								{book.count === 1 ? "is 1 book" : `are ${book.count} books`}{" "}
								📕📗 starting with '{book.letter}'
							</h3>
						);
					})}
			</ContainerStyle>

			{books &&
				books.map((book, i) => {
					return (
						<div key={i}>
							{book.count >= 1 && (
								<BooksTableStyle>
									<BooksTableHeaderStyle className='row'>
										<div className='col-2'>cover</div>
										<div className='col-6'>title</div>
										<div className='col-2'>rating</div>
										<div className='col-2'>format</div>
									</BooksTableHeaderStyle>
									<br />
									{book.booksLetter.map((book, i) => {
										return (
											<div key={i}>
												<div className='row'>
													<div className='col-2'>
														<BooksImageStyle
															src={book.image_url}
															alt={
																book.image_url ? book.title : "not available"
															}
															onClick={() =>
																history.push(`/book/${book.book_id}`)
															}
														/>
													</div>
													<BooksTitleStyle
														className='col-6'
														onClick={() =>
															history.push(`/book/${book.book_id}`)
														}
													>
														{book.title}
													</BooksTitleStyle>
													<div className='col-2'>{book.rating}</div>
													<div className='col-2'>{book.format}</div>
												</div>
												<br />
											</div>
										);
									})}
								</BooksTableStyle>
							)}
						</div>
					);
				})}
		</>
	);
};

export default Books;
