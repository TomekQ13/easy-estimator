import React from "react";
import Button from "react-bootstrap/esm/Button";

export default function JoinSessionBtn({ setJoinSessionModal }) {
    function handleClick() {
        setJoinSessionModal({ show: true });
    }

    return <Button onClick={handleClick}>Join session</Button>;
}
