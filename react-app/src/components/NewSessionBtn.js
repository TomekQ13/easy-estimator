import React from "react";
import Button from "react-bootstrap/Button";

export default function NewSessionBtn({ setNewSessionModal }) {
    function handleClick() {
        setNewSessionModal({ show: true });
    }

    return <Button onClick={handleClick}>New session</Button>;
}
