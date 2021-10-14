import * as Yup from "yup";
import { CreateBookProps } from "./CreateBook";

export const validateBook: Yup.SchemaOf<CreateBookProps> = Yup.object({
	title: Yup.string()
		.min(1, "Title must be at least 1 character")
		.max(200, "Title must not be more than 200 characters")
		.required("Required"),
	author: Yup.string().required("Author(s) is required"),
	summary: Yup.string()
		.min(20, "Summary must be at least 20 characters")
		.required("Summary is required"),
	pages: Yup.number()
		.min(1, "Pages must be at least 1")
		.required("Pages is required"),
	rating: Yup.number()
		.min(0.01, "Rating must be at least 0.01")
		.required("Rating is required"),
	ratingCount: Yup.number()
		.min(1, "Rating count must be at least 1")
		.required("Rating count is required"),
	image: Yup.string()
		.min(10, "Image url must be at least 10 characters")
		.required("Image url is required"),
	genre: Yup.string()
		.min(5, "Genre must be at least 5 characters")
		.required("Genre is required"),
});
