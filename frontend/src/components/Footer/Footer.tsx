import React from "react";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import {
	FooterStyle,
	AllRightsStyle,
	SocialLinksStyle,
	SocialIconsStyle,
} from "./Footer.style";

const Footer = () => {
	return (
		<>
			<FooterStyle className='row'>
				<AllRightsStyle className='col-6 col-sm-8'>
					<span>All Rights Reserved &copy; 2021</span>
				</AllRightsStyle>
				<SocialLinksStyle className='col-6 col-sm-4'>
					<div>Social Links:</div>
					<SocialIconsStyle
						href='https://www.linkedin.com/in/wangyh92/'
						target='_blank'
					>
						<FaLinkedin />
					</SocialIconsStyle>
					<SocialIconsStyle
						href='https://www.instagram.com/kinokuniya_singapore/'
						target='_blank'
					>
						<FaInstagram />
					</SocialIconsStyle>
					<SocialIconsStyle
						href='https://github.com/yh-sg/HonnoMushi'
						target='_blank'
					>
						<FaGithub />
					</SocialIconsStyle>
					<SocialIconsStyle
						href='https://www.linkedin.com/in/lindahsu007/'
						target='_blank'
					>
						<FaLinkedin />
					</SocialIconsStyle>
				</SocialLinksStyle>
			</FooterStyle>
		</>
	);
};

export default Footer;
