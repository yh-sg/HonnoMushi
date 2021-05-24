import React from "react";
import { useDispatch } from "react-redux";
import { Button, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { getBooksByLetter } from "../../store/Books/BooksActions";

const letters: string[] = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
const numbers: string[] = "0123456789".split("");

const BooksSelection = () => {
	let history = useHistory();
	return (
		<>
			<Row>
				{letters.map((letter, index) => (
					// <Link to={`/books/${letter}`}>
					<Button
						key={index}
						className='col-2 m-4 p-2'
						variant='outline-success'
						onClick={() => history.push(`/books/${letter}`)}
					>
						{letter}
					</Button>
					// </Link>
				))}
			</Row>
			<Row>
				{numbers.map((number, index) => (
					// <Link to={`/books/${number}`}>
					<Button
						key={index}
						className='col-2 m-4 p-2'
						variant='outline-primary'
						onClick={() => history.push(`/books/${number}`)}
					>
						{number}
					</Button>
					// </Link>
				))}
			</Row>
		</>
	);
};

export default BooksSelection;
