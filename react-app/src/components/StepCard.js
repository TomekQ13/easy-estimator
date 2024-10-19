import React from "react";
import Card from "react-bootstrap/Card";

function StepCard({ pictureSource, alt, text }) {
    return (
        <Card className="text-center" style={{ width: "14rem" }}>
            <Card.Img variant="top" src={pictureSource} alt={alt}></Card.Img>
            <Card.Body>
                <Card.Title>{text}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default StepCard;
