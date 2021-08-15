import styled from "styled-components";

export const ContainerStyle = styled.div<{
	isBooksSearching?: boolean;
	count?: number;
	loading?: boolean;
}>`
	text-align: center;
	padding: ${(props): string => (props.isBooksSearching ? "3rem " : "")};
	margin-bottom: ${(props): string =>
		props.loading || props.count === 0 ? "31.5rem" : ""};
`;

export const LibraryImageStyle = styled.img`
	width: 75vw;
	border-radius: 2rem;
	margin: 2rem;
	box-shadow: 5px 5px 10px black;
`;

export const SearchBookStyle = styled.div`
	margin: 0 auto;
	& input {
		width: 16rem;
		padding: 0.3rem;
	}
`;
