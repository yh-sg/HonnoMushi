import styled from "styled-components";

export const NoAccountStyle = styled.div`
	position: relative;
	top: -1.2rem;
	font-style: italic;

	& span {
		text-decoration: underline;
	}

	& span:hover {
		cursor: pointer;
		color: #c76d00;
	}
`;
