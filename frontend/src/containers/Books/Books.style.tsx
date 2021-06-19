import styled from "styled-components";

const numberOfBooks = (books: number) => {
	switch (books) {
		case 1: {
			return "22rem";
		}
		case 2: {
			return "16rem";
		}
		case 3: {
			return "10rem";
		}
		case 4: {
			return "3.5rem";
		}
		default:
			return "";
	}
};

export const BooksHeaderFontStyle = styled.h3`
	@media screen and (max-width: 575px) {
		font-size: 1.5rem;
	}
`;

export const BooksTableStyle = styled.div<{
	count: number;
}>`
	width: 65vw;
	margin: 0 auto;
	margin-bottom: ${(props) => numberOfBooks(props.count)};

	@media screen and (max-width: 575px) {
		width: 90vw;
		margin-left: 0.3rem;
		font-size: 0.7rem;
	}
`;

export const BooksTableHeaderStyle = styled.div`
	font-weight: bold;
	text-transform: capitalize;
`;

export const BooksImageStyle = styled.img`
	width: 50px;
	transition: all 0.5s ease-in-out;

	:hover {
		cursor: pointer;
		transform: scale(1.1);
		box-shadow: 2px 2px 8px black;
	}

	@media screen and (max-width: 575px) {
		width: 30px;
	}
`;

export const BooksTitleStyle = styled.div`
	:hover {
		cursor: pointer;
		color: #f08800;
	}
`;
