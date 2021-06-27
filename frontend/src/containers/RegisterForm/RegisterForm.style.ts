import styled from "styled-components";

export const FormStyle = styled.div`
	margin: 7rem;
	padding: 2rem;
	border: 1px solid #c76d00;
	border-radius: 15px;

	@media screen and (max-width: 576px) {
		padding: 1rem;
		margin: 2rem;
	}
`;

export const HaveAccountStyle = styled.div`
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
