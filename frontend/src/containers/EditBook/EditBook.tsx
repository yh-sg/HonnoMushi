import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import TextField from "../../components/TextField/TextField";
import TextArea from "../../components/TextField/TextArea";
import { FormStyle } from "../RegisterForm/RegisterForm.style";
import { CreateBookProps } from "../CreateBook/CreateBook";
import { validateBook } from "../CreateBook/CreateBookUtils";
import { getBookById } from "../../store/Book/BookAction";
import { RootState } from "../../store/rootReducer";
import { Spinner } from "react-bootstrap";
import { ContainerStyle } from "../../components/HomePage/HomePage.style";

const EditBook = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams() as { id: string };

	useEffect(() => {
		dispatch(getBookById(id));
	}, [dispatch, id]);

	const bookState = useSelector((state: RootState) => state.book);
	const { loading, book, error } = bookState;

	const handleEditBook = (bookValues: CreateBookProps) => {
		// add book_id here before submitting entry
		history.push(`/book/${id}`);
	};

	return (
		<>
			{loading && (
				<ContainerStyle isBooksSearching={!!book} loading={loading}>
					{error && <div>Insert React Error Boundary</div>}
					{loading && <Spinner animation='border' variant='warning' />}
				</ContainerStyle>
			)}

			{!loading &&
				book &&
				book.bookFormat.map((content) => {
					const { image_url, pages, rating, ratingCount, title } = content;
					const authors = content.authors.join(", ");
					const genres = content.genres.join(", ");
					const summary = content.summary
						.replaceAll("â€™", "'")
						.replaceAll("â€”", "; ")
						.replaceAll("â€¢Â", " ")
						.replaceAll("Â", " ");
					return (
						<FormStyle>
							<Formik
								initialValues={{
									title,
									author: authors,
									summary,
									pages,
									rating,
									ratingCount,
									image: image_url,
									genre: genres,
								}}
								onSubmit={(bookValues) => handleEditBook(bookValues)}
								validationSchema={validateBook}
							>
								{(formik) => (
									<div className='container'>
										<h3 className='my-4 font-weight-bold-display-4'>
											Edit this book
										</h3>
										<Form>
											<TextField label='Title' name='title' type='text' />
											<TextField label='Author(s)' name='author' type='text' />
											<TextArea
												label='Summary'
												name='summary'
												type='text'
												rows={10}
											/>
											<TextField
												label='Pages'
												name='pages'
												type='number'
												min={0}
											/>
											<TextField
												label='Rating'
												name='rating'
												type='number'
												min={0}
												step={0.01}
											/>
											<TextField
												label='Rating Count'
												name='ratingCount'
												type='number'
												min={0}
											/>
											<TextArea label='Image URL' name='image' type='url' />
											<TextField label='Genre(s)' name='genre' type='text' />

											<button className='btn btn-dark mt-4 mb-4' type='submit'>
												Save
											</button>
											<button
												className='btn btn-danger mx-3 mt-4 mb-4'
												type='reset'
											>
												Reset
											</button>
										</Form>
									</div>
								)}
							</Formik>
						</FormStyle>
					);
				})}
		</>
	);
};

export default EditBook;
