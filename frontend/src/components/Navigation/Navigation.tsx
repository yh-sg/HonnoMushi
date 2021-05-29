import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import book from "../../images/book.png";

const Navigation: React.FC = () => {
	return (
		<>
			<Navbar bg='warning' expand='sm'>
				<img
					alt='HM'
					src={book}
					width='30'
					height='30'
					className='d-inline-block align-top'
				/>
				<Navbar.Brand as={Link} to='/' className='pl-2'>
					HonnoMushi
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						{/* <Nav.Link as={Link} to='/about'>
							About
						</Nav.Link>
						<Nav.Link as={Link} to='/contact'>
							Contact
						</Nav.Link> */}
					</Nav>
					<Form inline>
						<FormControl
							type='text'
							placeholder='Coming soon...'
							className='mr-sm-2'
							style={{ width: "15rem" }}
						/>
						<Button variant='outline-dark'>🔍</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};

export default Navigation;
