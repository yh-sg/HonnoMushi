import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getBookById } from "../../store/Book/BookAction";
import { RootState } from "../../store/rootReducer";

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
			<h3>Book</h3>
			{book &&
				book.map((data, i) => {
					console.log("data", data);
					return (
						<div key={i}>
							{data.bookFormat.map((content, i) => {
								console.log("content", content);
								return (
									<div>
										<div key={i}>
											<h3>{content.genres}</h3>
										</div>
									</div>
								);
							})}
						</div>
					);
				})}
		</>
	);
};

// authors: ["Tayari Jones"];
// bookId: "c1706034";
// genres: (3)[("Fiction", "Contemporary", "Audiobook")];
// image_url: "https://images.gr-assets.com/books/1491493625l/33590210.jpg";
// pages: 308;
// rating: 4.01;
// ratingCount: 91515;
// summary: "Newlyweds Celestial and Roy are the embodiment of both the American Dream and the New South. He is a young executive, and she is an artist on the brink of an exciting career. But as they settle into the routine of their life together, they are ripped apart by circumstances neither could have imagined. In this deft exploration of love, loyalty, race, justice, and both Black masculinity and Black womanhood in 21st century America, Jones achieves that most-elusive of all literary goals: the Great American Novel. Named an Oprahâ€™s Book Club Selection.";
// title: "An American Marriage";

export default Book;
