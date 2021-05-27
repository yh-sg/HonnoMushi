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
	const { alphabet } = useParams() as {
		alphabet: string;
	};

	useEffect(() => {
		dispatch(getBooksByLetter(alphabet));
	}, []);

	const allBooksState = useSelector((state: RootState) => state.allBooks),
		{ books, error, loading } = allBooksState,
		{ letter, count, booksLetter } = books;

	return (
		<>
			<ContainerStyle isBooksSearch={!!books}>
				{error && <div>Insert React Error Boundary</div>}
				{loading && <div>Insert Loading gif</div>}
				{books && (
					<h3>
						There {count === 1 ? "is 1 book" : `are ${count} books`} 📕📗
						starting with '{letter}'
					</h3>
				)}
			</ContainerStyle>

			{books && (
				<>
					{count >= 1 && (
						<BooksTableStyle>
							<BooksTableHeaderStyle className='row'>
								<div className='col-2'>cover</div>
								<div className='col-6'>title</div>
								<div className='col-2'>rating</div>
								<div className='col-2'>format</div>
							</BooksTableHeaderStyle>
							<br />
							{booksLetter.map((book, i) => {
								return (
									<div key={i}>
										<div className='row'>
											<div className='col-2'>
												<BooksImageStyle
													src={book.image_url}
													alt={book.image_url ? book.title : "not available"}
													onClick={() => history.push(`/book/${book.book_id}`)}
												/>
											</div>
											<BooksTitleStyle
												className='col-6'
												onClick={() => history.push(`/book/${book.book_id}`)}
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
				</>
			)}
		</>
	);
};

export default Books;
