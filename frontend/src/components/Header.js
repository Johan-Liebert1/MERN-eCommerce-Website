import React from 'react'
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

function Header() {
    return (
        <header>
            <Navbar bg="light" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to = '/'>
                        <Navbar.Brand>Emazon</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                        <LinkContainer to = '/cart'>
                            <Nav.Link>
                                <i className='fas fa-shopping-cart mr-2'></i>Cart
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to = '/cart'>
                            <Nav.Link>
                                <i className='fas fa-user mr-2'></i>Sign In
                            </Nav.Link>
                        </LinkContainer>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header