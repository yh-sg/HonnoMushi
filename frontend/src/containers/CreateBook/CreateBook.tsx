import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { FormStyle } from "../RegisterForm/RegisterForm.style";
import TextField from "../../components/TextField/TextField";
import { validateBook } from "./CreateBookUtils";
import TextArea from "../../components/TextField/TextArea";

import { uuid } from "uuidv4";

export interface CreateBookProps {
	title: string;
	author: string;
	summary: string;
	pages: number;
	rating: number;
	ratingCount: number;
	image: string;
	genre: string;
}
const CreateBook: React.FC = () => {
	const myUUID = uuid();
	console.log(">>>> ", myUUID);

	const history = useHistory();

	const handleCreateBook = (bookValues: CreateBookProps) => {
		console.log("BOOK >> ", bookValues);
		// add book_id here before submitting entry
		// history.push(`/book/${id}`);
		history.push(`/books/${bookValues.title[0].toUpperCase()}`);
	};

	return (
		<FormStyle>
			<Formik
				initialValues={{
					title: "",
					author: "",
					summary: "",
					pages: 0,
					rating: 0,
					ratingCount: 0,
					image: "",
					genre: "",
				}}
				onSubmit={(bookValues) => handleCreateBook(bookValues)}
				validationSchema={validateBook}
			>
				{(formik) => (
					<div className='container'>
						<h3 className='my-4 font-weight-bold-display-4'>
							Create a new book
						</h3>
						<Form>
							<TextField label='Title' name='title' type='text' />
							<TextField label='Author(s)' name='author' type='text' />
							<TextArea label='Summary' name='summary' type='text' rows={10} />
							<TextField label='Pages' name='pages' type='number' min={0} />
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
							<button className='btn btn-danger mx-3 mt-4 mb-4' type='reset'>
								Clear form
							</button>
						</Form>
					</div>
				)}
			</Formik>
		</FormStyle>
	);
};

export default CreateBook;
