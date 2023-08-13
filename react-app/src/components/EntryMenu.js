import React, { useContext, useEffect, useState } from "react";
import JoinSessionBtn from "./JoinSessionBtn";
import NewSessionBtn from "./NewSessionBtn";
import JoinSessionModal from "./JoinSessionModal";
import { authContext } from "../contexts/Auth";
import Container from "react-bootstrap/esm/Container";

export default function EntryMeny() {
    const [joinSessionModal, setJoinSessionModal] = useState({ show: false });

    const { username, setRegisterModal, userId } = useContext(authContext);

    useEffect(() => {
        if (
            username === null ||
            username === undefined ||
            userId === null ||
            userId === undefined
        ) {
            setRegisterModal({ show: true });
        }
    }, [username, setRegisterModal]);

    return (
        <>
            <Container className="vh-75 d-flex flex-column justify-content-start align-items-center">
                <div className="header-section">
                    <h1 className="main-header text-center">
                        The Estimation Poker for all your planning needs
                    </h1>
                    <p className="text-center mt-3">
                        The simplest estimation tool for development teams
                    </p>
                </div>
                <div className="button-section">
                    <NewSessionBtn />

                    <JoinSessionBtn setJoinSessionModal={setJoinSessionModal} />
                    {joinSessionModal.show && (
                        <JoinSessionModal
                            setJoinSessionModal={setJoinSessionModal}
                            joinSessionModal={joinSessionModal}
                        />
                    )}
                </div>
            </Container>
        </>
    );
}
