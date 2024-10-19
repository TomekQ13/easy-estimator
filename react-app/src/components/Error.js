import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // If using React Router for navigation

function NotFoundPage() {
    const navigate = useNavigate(); // If you are using React Router for navigation

    const handleGoHome = () => {
        navigate("/"); // Navigate to the home page when the button is clicked
    };

    return (
        <Container
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "75vh" }}
        >
            <Row className="text-center">
                <Col>
                    <h1
                        style={{
                            fontSize: "5rem",
                            fontWeight: "bold",
                            color: "#6c757d",
                        }}
                    >
                        404
                    </h1>
                    <h2 className="mb-3" style={{ color: "#6c757d" }}>
                        Page Not Found
                    </h2>
                    <p className="text-muted mb-4">
                        Oops! The page you are looking for does not exist. It
                        might have been moved or deleted.
                    </p>
                    <Button variant="primary" onClick={handleGoHome}>
                        Go Back Home
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default NotFoundPage;
