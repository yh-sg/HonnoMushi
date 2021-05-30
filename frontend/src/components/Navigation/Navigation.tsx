import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import book from "../../images/book.png";
import { HonnoMushiLogoStyled } from "./Navigation.style";

const Navigation: React.FC = () => {
	return (
		<>
			<Navbar bg='warning' expand='md'>
				<HonnoMushiLogoStyled
					alt='HM'
					src={book}
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
						<Nav.Link as={Link} to='/create'>
							Create
						</Nav.Link>
						<Nav.Link as={Link} to='/collection'>
							Collection
						</Nav.Link>
					</Nav>
					<Form inline>
						<FormControl
							type='text'
							placeholder='Coming soon...'
							className='mt-1'
							style={{ width: "15rem" }}
						/>
						<Button variant='outline-dark' className='ml-1 mr-2 mt-1'>
							🔍
						</Button>
					</Form>
					<Button variant='outline-danger' className='mr-2 mt-1'>
						Register
					</Button>
					<Button variant='outline-dark' className='mr-2 mt-1'>
						Log In
					</Button>
					{/* {resetPassword && (
						<Button variant='outline-dark' className='mr-2 mt-1'>
							Reset Password
						</Button>
					)} */}
					{/* {loggedIn && (
						<Button variant='outline-danger' className='mr-2 mt-1'>
							Log Out
						</Button>
					)} */}
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};

export default Navigation;
