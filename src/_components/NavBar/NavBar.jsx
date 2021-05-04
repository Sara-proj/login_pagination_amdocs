import React from 'react';
import { Button, Navbar, Nav, NavItem, NavDropdown, Form, FormControl, MenuItem } from 'react-bootstrap';
import { Link, NavLink } from "react-router-dom";
import './navbar.scss';

function NavBar(props) {
    return (
        <div>
            <Navbar bg="light" expand="lg" className="navbar">
                <Navbar.Brand href="https://www.amdocs.com/">
                    <img  width="100" src="https://www.amdocs.com/amdocsOmega/images/logos/amdocs-logo-social-thumb.jpg"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                        <Nav.Link >
                            <Link
                                to="/login"
                            >
                                Login
                        </Link>
                        </Nav.Link>
                        <Nav.Link >
                            <Link
                                to="/list"
                            >
                                List
                        </Link>
                        </Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-secondary">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;