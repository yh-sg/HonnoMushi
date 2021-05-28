import styled from "styled-components";

export const BooksTableStyle = styled.div`
	width: 65vw;
	margin: 0 auto;
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
`;

export const BooksTitleStyle = styled.div`
	:hover {
		cursor: pointer;
		color: #f08800;
	}
`;
