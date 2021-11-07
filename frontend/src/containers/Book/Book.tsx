import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import Amplify from "aws-amplify";
import {AccessLevel} from "@aws-amplify/ui-components"

import { getBookById } from "../../store/Book/BookAction";
import AmplifyParams from "../../api/awsservice"
import { RootState } from "../../store/rootReducer";
import { ContainerStyle } from "../../components/HomePage/HomePage.style";
import { BookContainer, ImageStyle, ButtonsRowStyle, AWSImage } from "./Book.style";

const Book: React.FC = (): React.ReactElement => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams() as {
		id: string;
	};

	useEffect(() => {
		dispatch(getBookById(id));
	}, [dispatch, id]);

	const bookState = useSelector((state: RootState) => state.book);
	const { loading, book, error } = bookState;

	Amplify.configure(AmplifyParams);

	return (
		<>
			<ContainerStyle isBooksSearching={!!book} loading={loading}>
				{error.message.length !== 0 && <div>Insert React Error Boundary</div>}
				{loading && <Spinner animation='border' variant='warning' />}
			</ContainerStyle>

			{!loading && book && (
				<>
					{book.bookFormat.map((content, i) => {
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
										{image_url.startsWith("public/")?
											<AWSImage alt="nothing" imgKey={image_url.substring(7)} level={AccessLevel.Public} handleOnError={(e)=>console.error(e)} handleOnLoad={(e)=>console.info(e)}/>			
										:
											<ImageStyle src={image_url} alt={title} />
										}
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
												onClick={() => history.goBack()}
												variant='success'
												className='ml-3 mr-3'
											>
												Back to Books
											</Button>
											<Button
												onClick={() => history.push(`/`)}
												variant='outline-primary'
											>
												Back to HonnoMushi
											</Button>
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
