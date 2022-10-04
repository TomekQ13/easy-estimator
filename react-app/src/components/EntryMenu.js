import React, { useContext, useEffect, useState } from "react";
import JoinSessionBtn from "./JoinSessionBtn";
import NewSessionBtn from "./NewSessionBtn";
import NewSessionModal from "./NewSessionModal";
import JoinSessionModal from "./JoinSessionModal";
import { authContext } from "../contexts/Auth";

export default function EntryMeny() {
    const [newSessionModal, setNewSessionModal] = useState({ show: false });
    const [joinSessionModal, setJoinSessionModal] = useState({ show: false });

    const { username, setRegisterModal } = useContext(authContext);

    useEffect(() => {
        if (username === null || username === undefined) {
            setRegisterModal({ show: true });
        }
    }, [username, setRegisterModal]);

    return (
        <>
            <NewSessionBtn
                setNewSessionModal={setNewSessionModal}
                newSessionModal={newSessionModal}
            />
            <JoinSessionBtn setJoinSessionModal={setJoinSessionModal} />
            {newSessionModal.show && (
                <NewSessionModal
                    setNewSessionModal={setNewSessionModal}
                    newSessionModal={newSessionModal}
                />
            )}
            {joinSessionModal.show && (
                <JoinSessionModal
                    setJoinSessionModal={setJoinSessionModal}
                    joinSessionModal={joinSessionModal}
                />
            )}
        </>
    );
}
