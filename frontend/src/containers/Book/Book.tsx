import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import { getBookById } from "../../store/Book/BookAction";
import { RootState } from "../../store/rootReducer";
import { ContainerStyle } from "../../components/HomePage/HomePage.style";
import { BookContainer, ImageStyle, ButtonsRowStyle } from "./Book.style";

const Book: React.FC = (): React.ReactElement => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams() as {
		id: string;
	};
	const userData = JSON.parse(localStorage.getItem("user") || "{}");
	const isLoggedIn = Object.keys(userData).length > 0;
	const bookState = useSelector((state: RootState) => state.book);
	const { loading, book, error } = bookState;

	useEffect(() => {
		dispatch(getBookById(id));
	}, [dispatch, id]);

	return (
		<>
			<ContainerStyle isBooksSearching={!!book} loading={loading}>
				{error && <div>Insert React Error Boundary</div>}
				{loading && <Spinner animation='border' variant='warning' />}
			</ContainerStyle>

			{!loading && book && (
				<>
					{book.bookFormat.map((content, i) => {
						const { image_url, pages, rating, ratingCount } = content;
						const authors = content.authors.join(", ");
						const genres = content.genres.join(", ");
						const title = content.title.replaceAll("â€™", "'");
						const summary = content.summary
							.replaceAll("â€™", "'")
							.replaceAll("â€”", "; ")
							.replaceAll("â€“", "")
							.replaceAll("â€¦", ". ")
							.replaceAll("â€¢Â", " ")
							.replaceAll("Â", " ");
						return (
							<BookContainer key={i}>
								<div className='row'>
									<div className='col-3'>
										<ImageStyle src={image_url} alt={title} />
									</div>
									<div className='col-9'>
										<h2>{title}</h2>
										<br />
										<p>
											<code>Authors:</code> {authors}
										</p>
										<p>
											<code>Genres:</code> {genres}
										</p>
										<p>
											<code>Pages:</code> {pages}
										</p>
										<p>
											<code>Rating:</code> {rating}
										</p>
										<p>
											<code>Rating Count:</code> {ratingCount}
										</p>
										<p>
											<code>Summary:</code> {summary}
										</p>
										<ButtonsRowStyle className='row'>
											<Button
												// onClick={() => history.goBack()} // will go back to EditBook if came from there
												onClick={() => history.push(`/books/${title[0]}`)}
												variant='success'
												className='ml-3'
											>
												Back to Books
											</Button>
											<Button
												onClick={() => history.push(`/`)}
												variant='primary'
												className='ml-3'
											>
												Back to HonnoMushi
											</Button>
											{isLoggedIn && (
												<Button
													onClick={() => history.push(`/edit/${id}`)}
													variant='outline-secondary'
													className='ml-3'
												>
													Edit
												</Button>
											)}
											{isLoggedIn && (
												<Button
													onClick={() => history.push(`/deleteBook`)}
													variant='outline-danger'
													className='ml-3'
												>
													Delete
												</Button>
											)}
										</ButtonsRowStyle>
									</div>
								</div>
							</BookContainer>
						);
					})}
				</>
			)}
		</>
	);
};

export default Book;
