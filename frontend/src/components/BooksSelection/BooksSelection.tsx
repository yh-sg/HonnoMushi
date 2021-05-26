import React from "react";
import { Button, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { BooksSelectionStyle } from "./BooksSelection.style";

const letters: string[] = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
const numbers: string[] = "0123456789".split("");

const BooksSelection = () => {
	let history = useHistory();
	return (
		<>
			<BooksSelectionStyle>
				<Row className='ml-5'>
					{letters.map((letter, index) => (
						<Button
							key={index}
							className='col-2 m-4 p-2'
							variant='outline-success'
							onClick={() => history.push(`/books/${letter}`)}
						>
							{letter}
						</Button>
					))}
				</Row>
				<Row className='ml-5'>
					{numbers.map((number, index) => (
						<Button
							key={index}
							className='col-2 m-4 p-2'
							variant='outline-primary'
							onClick={() => history.push(`/books/${number}`)}
						>
							{number}
						</Button>
					))}
				</Row>
			</BooksSelectionStyle>
		</>
	);
};

export default BooksSelection;
