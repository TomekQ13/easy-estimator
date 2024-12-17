import React, { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { authContext } from "../contexts/Auth";
import Logo from "../pictures/agilepokerlogo.png";
import DarkLightToggle from "./DarkLightToggle";

export default function MyNavbar() {
    // the problem with the reigstration may be here
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
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="align-items-end flex-column">
                        {username && (
                            <Navbar.Text>
                                <span>Username: {username}</span>
                            </Navbar.Text>
                        )}
                        <DarkLightToggle />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
