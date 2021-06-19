import styled from "styled-components";

export const FooterStyle = styled.div`
	background: #f7c133;
	margin: 0 auto;
	height: 6.5rem;
`;

export const AllRightsStyle = styled.div`
	padding: 2rem 1rem;

	@media screen and (min-width: 576px) {
		padding-left: 2.5rem;
	}
	@media screen and (min-width: 720px) {
		padding-left: 4.5rem;
	}
	@media screen and (min-width: 960px) {
		padding-left: 7.5rem;
	}
`;

export const SocialLinksStyle = styled.div`
	padding: 1.2rem;
`;

export const SocialIconsStyle = styled.a`
	color: #333;
	font-size: 1.7rem;
	line-height: 2rem;
	padding-right: 7px;

	:hover {
		cursor: pointer;
		color: #853100;
	}
`;
