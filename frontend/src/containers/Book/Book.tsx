import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getBookById } from "../../store/Book/BookAction";
import { RootState } from "../../store/rootReducer";
import { BookContainer, ImageStyle } from "./Book.style";

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

	return (
		<>
			{error && <div>Insert React Error Boundary</div>}
			{loading && <div>Insert Loading gif</div>}
			{book && (
				<>
					{book.bookFormat.map((content, i) => {
						console.log("content", content);
						const { authors, image_url, pages, rating, ratingCount, title } =
							content;
						const genres = content.genres.join(", ");
						const summary = content.summary
							.replaceAll("â€™", "'")
							.replaceAll("â€”", "; ");
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
