import React, { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { authContext } from "../contexts/Auth";
import Logo from "../pictures/agilepokerlogo.png";

export default function MyNavbar() {
    const { username } = useContext(authContext);

    return (
        <Navbar className="w-100" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img src={Logo} width="300" height="60" alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    id="navbar-toggler-button"
                />
                <Navbar.Collapse>
                    <Nav className="me-auto"></Nav>
                    {username && (
                        <Navbar.Text className="text-right">
                            Username: {username}
                        </Navbar.Text>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
