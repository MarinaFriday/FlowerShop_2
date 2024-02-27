import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav} from 'react-bootstrap';
import logo from "../../img/logo_myata.png";
import Cookies from 'universal-cookie';

const NavBar = () => {
    const cookies = new Cookies();
    const [role, setRole] = useState(false);

    useEffect(() => { setRole(cookies.get('userRole')) }, []);

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
                            <Nav.Link href="/">Главная</Nav.Link>
                            {(role !== false && role !== undefined) ? (
                                <>
                        <Nav.Link href="/flowers">Каталог цветов</Nav.Link>
                        <Nav.Link href="/bouquets">Каталог букетов</Nav.Link>
                        <Nav.Link href="/compositions">Каталог композиций</Nav.Link>                       
                        <Nav.Link href="/tools">Настройки</Nav.Link>
                            </>) : null}
                    </Nav>
                    
                </Navbar.Collapse>
            </Container>
            </Navbar>
            
        </>
    );
}
export default NavBar;