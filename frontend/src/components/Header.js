import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../actions/userActions'

function Header() {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

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

                        { userInfo ? (
                            <NavDropdown title = {userInfo.name} id = 'username'>
                                
                                <LinkContainer to = '/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Item onClick = {logoutHandler}>
                                    Logout
                                </NavDropdown.Item>

                            </NavDropdown>
                        )

                        : 

                        <LinkContainer to = '/login'>

                            <Nav.Link>
                                <i className='fas fa-user mr-2'></i>Sign In
                            </Nav.Link>

                        </LinkContainer>
                        
                        }   

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
