import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const Footer = () => {
    return (
        <Navbar fixed="bottom" className="text-center footer">
            <Container className="justify-content-between">
                <Nav>
                    <Nav.Link href="#faq" className="text-white">
                        FAQ
                    </Nav.Link>
                    <Nav.Link href="#contact" className="text-white">
                        Contact
                    </Nav.Link>
                    <Nav.Link href="#privacy-policy" className="text-white">
                        Privacy Policy
                    </Nav.Link>
                </Nav>
                <Navbar.Text className="text-white">
                    &copy; 2024 Tomasz Kuczak. All rights reserved.
                </Navbar.Text>
            </Container>
        </Navbar>
    );
};

export default Footer;
