import React from "react";
import { useDispatch } from "react-redux";
import { Button, Row } from "react-bootstrap";
import { getBooksByLetter } from "../../store/Books/BooksActions";

const letters: string[] = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
const numbers: string[] = "0123456789".split("");

const BooksSelection = () => {
	const dispatch = useDispatch();

	const handleClickLetterOrNumber = (letter: string) => {
		dispatch(getBooksByLetter(letter));
	};
	return (
		<>
			<Row>
				{letters.map((letter, index) => (
					<Button
						key={index}
						className='col-2 m-4 p-2'
						variant='outline-success'
						onClick={() => handleClickLetterOrNumber(letter)}
					>
						{letter}
					</Button>
				))}
			</Row>
			<Row>
				{numbers.map((letter, index) => (
					<Button
						key={index}
						className='col-2 m-4 p-2'
						variant='outline-primary'
						onClick={() => handleClickLetterOrNumber(letter)}
					>
						{letter}
					</Button>
				))}
			</Row>
		</>
	);
};

export default BooksSelection;
