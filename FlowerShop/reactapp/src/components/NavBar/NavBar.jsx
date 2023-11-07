import React from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import logo from "../../img/logo_myata.png";


const NavBar = () => {

    return (
        <>
        <Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark" >
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        height="30"
                        width="30"
                        className="d-inline-blok align-top"
                        alt="Logo"
                    /> Мята FlowerShop
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nar">
                    <Nav className="ms-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/flowers">Flower List</Nav.Link>
                        <Nav.Link href="/statistics">Statistics</Nav.Link>
                        <Nav.Link href="/tools">Tools</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="text"
                            placeholder="Поиск"
                            className="me-sm-2"
                        />
                        <Button variant="outline-info">Поиск</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            
        </>
    );
}
export default NavBar;