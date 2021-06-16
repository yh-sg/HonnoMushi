import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { BooksSelectionStyle } from "./BooksSelection.style";

const letters: string[] = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
const numbers: string[] = "0123456789".split("");

const BooksSelection:React.FC = ():React.ReactElement => {
	let history = useHistory();
	return (
		<>
			<BooksSelectionStyle>
				<div className='row'>
					<div className='col-7'>
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
					</div>
					<div className='col-5'>
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
					</div>
				</div>
			</BooksSelectionStyle>
		</>
	);
};

export default BooksSelection;
