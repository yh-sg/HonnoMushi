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
				<div className='row mt-3 mb-3'>
					<div>
						{letters.map((letter, index) => (
							<Button
								key={index}
								className='col-3 col-md-1 m-2 mb-3'
								variant='outline-success'
								onClick={() => history.push(`/books/${letter}`)}
								data-testid='letterButton'
							>
								{letter}
							</Button>
						))}
					</div>
				</div>

				<div className='row mb-3'>
					{numbers.map((number, index) => (
						<Button
							key={index}
							className='col m-2 p-2'
							variant='outline-primary'
							onClick={() => history.push(`/books/${number}`)}
							data-testid='numberButton'
						>
							{number}
						</Button>
					))}
				</div>
			</BooksSelectionStyle>
		</>
	);
};

export default BooksSelection;
