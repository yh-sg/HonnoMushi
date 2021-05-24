import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBooksByLetter } from "../../store/Books/BooksActions";
import { RootState } from "../../store/rootReducer";

const Books: React.FC = () => {
	const { letter } = useParams() as {
		letter: string;
	};
	const dispatch = useDispatch();
	
	const allBookState = useSelector((state: RootState) => state.allBooks);
	
	useEffect(() => {
		dispatch(getBooksByLetter(letter));
	}, []);

	console.log("allBookState -->", allBookState);

	return (
		<>
			<h3>Books 📕📗 starting with '{letter}'</h3>
			<hr/>
			{allBookState.books.map((e,i)=>{
				const {letter,count,booksLetter} = e;
				console.log(booksLetter);
				return(
					<div key={i}>
						<h5>Total Books:{count}</h5>
						{booksLetter.map(e=>{
							const {title, _id, pages, rating, description, image_url} = e;
							return(
								<div key={_id}>
									<h1>{title}</h1>
									<p>Pages: {pages}</p>
									<p>Rating: {rating}</p>
									<p>Desc: {description}</p>
									<img src={image_url} alt={title}/>
									<hr/>
								</div>
							)
						})}
						<hr/>
					</div>
				)
			})}
			{/* {booksState && booksState.} */}
		</>
	);
};

export default Books;