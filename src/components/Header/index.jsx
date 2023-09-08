import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

const Header = ({accessToken}) => (
    <Navbar bg="dark" variant="dark" className="p-2">
        <Navbar.Brand>interdental brushes online </Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="/">Главная</Nav.Link>
            {!!accessToken ?
                (
                    <>
                        <Nav.Link href="/login">не войти</Nav.Link>
                        <Nav.Link href="/registration">Зарегистрироваться</Nav.Link>
                    </>
                )
                : (
                    <>
                        <Nav.Link href="/login">Войти</Nav.Link>
                        <Nav.Link href="/registration">Зарегистрироваться</Nav.Link>
                    </>
                )}
        </Nav>
    </Navbar>
);

export default Header;
