import React from "react";
import pageNotFound from "../../images/pageNotFound.jpg";
import { ContainerStyle } from "../HomePage/HomePage.style";
import { PageNotFoundImageStyle } from "./PageNotFound.style";

const PageNotFound = () => {
	return (
		<>
			<ContainerStyle>
				<PageNotFoundImageStyle src={pageNotFound} alt='page not found' />
			</ContainerStyle>
		</>
	);
};

export default PageNotFound;
