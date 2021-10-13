import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormStyle } from "../RegisterForm/RegisterForm.style";
import TextField from "../../components/TextField/TextField";

interface NewBook {
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
	const validateBook: Yup.SchemaOf<NewBook> = Yup.object({
		title: Yup.string()
			.min(1, "Title must be at least 1 character")
			.max(30, "Title must not be more than 20 characters")
			.required("Required"),
		author: Yup.string().required("Author(s) is required"),
		summary: Yup.string()
			.min(20, "Summary must be at least 20 characters")
			.required("Summary is required"),
		pages: Yup.number()
			.min(1, "Pages must be at least 1 character")
			.required("Pages is required"),
		rating: Yup.number()
			.min(1, "Rating must be at least 1 character")
			.required("Rating is required"),
		ratingCount: Yup.number()
			.min(1, "Rating count must be at least 1 character")
			.required("Rating count is required"),
		image: Yup.string()
			.min(10, "Image url must be at least 10 characters")
			.required("Image url is required"),
		genre: Yup.string()
			.min(5, "Genre must be at least 5 characters")
			.required("Genre is required"),
	});

	const handleCreateBook = (bookValues: NewBook) => {
		console.log("BOOK >> ", bookValues);
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
							<TextField label='Author' name='author' type='text' />
							<TextField label='Summary' name='summary' type='text' />
							<TextField label='Pages' name='pages' type='number' />
							<TextField label='Rating' name='rating' type='number' />
							<TextField
								label='Rating Count'
								name='ratingCount'
								type='number'
							/>
							<TextField label='Image URL' name='image' type='url' />
							<TextField label='Genre' name='genre' type='text' />

							<button className='btn btn-dark mt-4 mb-4' type='submit'>
								Create
							</button>
							<button className='btn btn-danger mx-3 mt-4 mb-4' type='reset'>
								Reset
							</button>
						</Form>
					</div>
				)}
			</Formik>
		</FormStyle>
	);
};

export default CreateBook;
