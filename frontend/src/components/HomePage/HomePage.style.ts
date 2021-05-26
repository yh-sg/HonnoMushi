import styled from "styled-components";

export const ContainerStyle = styled.div<{
	isBooksSearch?: boolean;
}>`
	text-align: center;
	padding: ${(props): string => (props.isBooksSearch ? "3rem " : "")};
`;

export const LibraryImageStyle = styled.img`
	width: 85vw;
	border-radius: 2rem;
	margin: 2rem;
	box-shadow: 5px 5px 10px black;
`;
