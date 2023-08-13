import React from "react";
import Button from "react-bootstrap/esm/Button";

export default function JoinSessionBtn({ setJoinSessionModal }) {
    function handleClick() {
        setJoinSessionModal({ show: true });
    }

    return (
        <Button onClick={handleClick} className="mt-4 fw-bold btn-lg">
            Join session
        </Button>
    );
}
