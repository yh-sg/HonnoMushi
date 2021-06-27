import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import books from "../../images/books.png";
import { HonnoMushiLogoStyled } from "./Navigation.style";

const Navigation: React.FC = (): React.ReactElement => {
	const userData = JSON.parse(localStorage.getItem("user") || "{}");

	let displayName;

	if (Object.keys(userData).length > 0) {
		displayName = userData["result"]["name"];
	}

	const onLogOut = () => {
		if (Object.keys(userData).length > 0) {
			window.location.reload();
			return localStorage.removeItem("user");
		}
	};

	return (
		<>
			<Navbar bg='warning' expand='md'>
				<HonnoMushiLogoStyled
					alt='HM'
					src={books}
					width='25px'
					height='25px'
					className='d-inline-block align-top'
				/>
				<Navbar.Brand as={Link} to='/' className='pl-2'>
					HonnoMushi
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<Nav.Link as={Link} to='/books'>
							Library
						</Nav.Link>
						<Nav.Link as={Link} to='/create'>
							Create
						</Nav.Link>
						<Nav.Link as={Link} to='/collection'>
							Collection
						</Nav.Link>
					</Nav>
					<code className='mr-3'>{displayName}</code>
					<Button
						as={Link}
						to='/login'
						variant='outline-dark'
						className='mr-2 mt-1'
						onClick={onLogOut}
					>
						{Object.keys(userData).length === 0 ? "Log In" : "Log Out"}
					</Button>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};

export default Navigation;
