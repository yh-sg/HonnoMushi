import React from "react";
import { Button, Container, Row } from "react-bootstrap";

const letters: String[] = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

const numbers: String[] = "0123456789".split("");

const PageOne: React.FC = () => {
	return (
		<>
			<Container>
				<h1>HonnoMushi</h1>
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
			</Container>
		</>
	);
};

export default PageOne;
