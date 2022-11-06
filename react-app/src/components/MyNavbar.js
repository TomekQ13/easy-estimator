import React from "react";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function MyNavbar() {
    return (
        <Container>
            <Navbar>
                <Nav bg="light" className="mb-3">
                    <Navbar.Brand href="/">Easy Estimator</Navbar.Brand>
                </Nav>
            </Navbar>
        </Container>
    );
}
