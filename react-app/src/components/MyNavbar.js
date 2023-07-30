import React, { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import Navbar from "react-bootstrap/Navbar";
import { authContext } from "../contexts/Auth";

export default function MyNavbar() {
    const { username } = useContext(authContext);

    return (
        <Navbar className="mb-3 w-100 flex-column">
            <Container>
                <Navbar.Brand href="/">Cool name</Navbar.Brand>
                {username && (
                    <Navbar.Text className="justify-content-end">
                        Username: {username}
                    </Navbar.Text>
                )}
            </Container>
        </Navbar>
    );
}
