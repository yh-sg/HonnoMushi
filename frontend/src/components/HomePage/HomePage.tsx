import React from "react";
import library from "../../images/library.jpg";
import BooksSelection from "../BooksSelection/BooksSelection";
import { ContainerStyle, LibraryImageStyle } from "./HomePage.style";

const HomePage: React.FC = (): React.ReactElement => {
	return (
		<>
			<ContainerStyle>
				<LibraryImageStyle
					src={library}
					alt='classic vintage library of books'
				/>
				<h3>Find books by letters or alphabets</h3>
				<BooksSelection />
			</ContainerStyle>
		</>
	);
};

export default HomePage;
