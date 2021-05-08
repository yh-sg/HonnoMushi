import React from "react";
import { Button, Container, Row } from "react-bootstrap";

const App: React.FC = () => {
	const lettersAndNumerics = "abcdefghijklmnopqrstuvwxyz0123456789",
		letters: String[] = lettersAndNumerics.split("");

	return (
		<div className='App'>
			<Container>
				<h1>HonnoMushi Test</h1>
				<Row>
					{letters.map((letter, index) => (
						<Button
							key={index}
							className='col-2 m-4 p-3'
							variant='outline-success'
						>
							{letter}
						</Button>
					))}
				</Row>
			</Container>
		</div>
	);
};

export default App;
