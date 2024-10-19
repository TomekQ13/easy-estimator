import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import TooltipContact from "./ContactTooltip";

const Footer = ({ fixedBottom }) => {
    return (
        <Navbar
            expand="lg"
            className="text-center footer py-0"
            fixed={fixedBottom && "bottom"}
        >
            <Container className="justify-content-start gap-4 py-0">
                <Navbar.Text className="text-white">
                    <TooltipContact />
                </Navbar.Text>
                <Nav.Link className="text-white" href="/privacy">
                    Privacy Policy
                </Nav.Link>
            </Container>
        </Navbar>
    );
};

export default Footer;
