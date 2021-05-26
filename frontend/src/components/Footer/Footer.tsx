import React from "react";
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa'
import {
	FooterStyle,
	AllRightsStyle,
	SocialLinksStyle,
	IconStyle,
} from "./Footer.style";

const Footer = () => {
	return (
		<>
			<FooterStyle className='row'>
				<AllRightsStyle className='col-8'>
					<p>All Rights Reserved &copy; 2021</p>
				</AllRightsStyle>
				<SocialLinksStyle className='col-4'>
					<div>Social Links:</div>
					<IconStyle>
						<FaLinkedin />
					</IconStyle>
					<IconStyle>
						<FaInstagram />
					</IconStyle>
					<IconStyle>
						<FaGithub />
					</IconStyle>
					<IconStyle>
						<FaLinkedin />
					</IconStyle>
				</SocialLinksStyle>
			</FooterStyle>
		</>
	);
};

export default Footer;
