import React from "react";
import Navigation from "../Navigation/Navigation";
import library from "../../images/library.jpg";
import BooksSelection from "../../containers/BooksSelection/BooksSelection";
import { ContainerStyle, LibraryImageStyle } from "./HomePage.style";

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
				<BooksSelection />
			</ContainerStyle>
		</>
	);
};

export default PageOne;
