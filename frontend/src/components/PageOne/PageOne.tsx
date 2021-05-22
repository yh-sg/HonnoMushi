import React from "react";
import { Button, Row } from "react-bootstrap";
import Navigation from "../Navigation/Navigation";
import library from "../../images/library.jpg";
import { ContainerStyle, LibraryImageStyle } from "./PageOne.style";

const letters: String[] = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

const numbers: String[] = "0123456789".split("");

const PageOne: React.FC = () => {
	return (
		<>
			<Navigation />
			<ContainerStyle>
				<LibraryImageStyle
					src={library}
					alt='classic vintage library of books'
				/>
				<h1>Search for a Book 📖</h1>
				<Row>
					{letters.map((letter, index) => (
						<Button
							key={index}
							className='col-2 m-4 p-2'
							variant='outline-success'
						>
							{letter}
						</Button>
					))}
				</Row>
				<Row>
					{numbers.map((number, index) => (
						<Button className='col-2 m-4 p-2' variant='outline-primary'>
							{number}
						</Button>
					))}
				</Row>
			</ContainerStyle>
		</>
	);
};

export default PageOne;
