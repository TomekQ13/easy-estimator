import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

export default function MyNavbar() {
    return (
        <div>
            <Navbar bg="light" className="mb-3">
                <Container>
                    <Navbar.Brand>
                        <Link to="/">Easy Estimator</Link>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
}
