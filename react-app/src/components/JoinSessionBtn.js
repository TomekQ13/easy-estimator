import React, { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { authContext } from "../contexts/Auth";
import JoinSessionModal from "./JoinSessionModal";

export default function JoinSessionBtn() {
    const { username, setRegisterModal, userId } = useContext(authContext);
    const [joinSessionModal, setJoinSessionModal] = useState({ show: false });

    function handleClick() {
        if (
            username === null ||
            username === undefined ||
            userId === null ||
            userId === undefined
        ) {
            setRegisterModal({ show: true });
        }

        setJoinSessionModal({ show: true });
    }

    return (
        <>
            <Button onClick={handleClick} className="mt-4 fw-bold btn-lg">
                Join session
            </Button>
            {joinSessionModal.show && (
                <JoinSessionModal
                    setJoinSessionModal={setJoinSessionModal}
                    joinSessionModal={joinSessionModal}
                />
            )}
        </>
    );
}
