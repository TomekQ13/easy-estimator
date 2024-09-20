import React from "react";
import { Container, Navbar } from "react-bootstrap";
import TooltipContact from "./ContactTooltip";

const Footer = () => {
    return (
        <Navbar fixed="bottom" className="text-center footer py-0">
            <Container className="justify-content-between">
                <Navbar.Text className="text-white">
                    <TooltipContact />
                </Navbar.Text>
                <Navbar.Text className="text-white fw-light fs-6">
                    &copy; 2024 Tomasz Kuczak. All rights reserved.
                </Navbar.Text>
            </Container>
        </Navbar>
    );
};

export default Footer;
