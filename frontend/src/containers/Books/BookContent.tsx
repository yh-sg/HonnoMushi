import React from "react";
import { useHistory } from "react-router-dom";
import { BookLetter } from "../../store/Books/BooksTypes";
import {
	BooksTableStyle,
	BooksTableHeaderStyle,
	BooksImageStyle,
	BooksTitleStyle,
} from "./Books.style";

interface Props {
	booksLetter: BookLetter[];
	count: number;
}

const BookContent: React.FC<Props> = ({
	count,
	booksLetter,
}): React.ReactElement => {
	const history = useHistory();

	return (
		<>
			{count >= 1 && (
				<>
					<BooksTableStyle count={count}>
						<BooksTableHeaderStyle className='row'>
							<div className='col-2'>cover</div>
							<div className='col-6'>title</div>
							<div className='col-2'>rating</div>
							<div className='col-2'>format</div>
						</BooksTableHeaderStyle>
						<br />
						{booksLetter.map((book) => {
							const { book_id, _id, rating, format, image_url } = book;
							const title = book.title.replaceAll("â€™", "'");

							return (
								<div key={_id}>
									<div className='row'>
										<div className='col-2'>
											<BooksImageStyle
												src={image_url}
												alt={image_url ? title : "Not available"}
												onClick={() => history.push(`/book/${book_id}`)}
											/>
										</div>
										<BooksTitleStyle
											className='col-6'
											onClick={() => history.push(`/book/${book_id}`)}
										>
											{title}
										</BooksTitleStyle>
										<div className='col-2'>{rating}</div>
										<div className='col-2'>{format}</div>
									</div>
									<br />
								</div>
							);
						})}
					</BooksTableStyle>
				</>
			)}
		</>
	);
};

export default BookContent;
