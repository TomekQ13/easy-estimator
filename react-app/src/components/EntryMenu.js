import React, { useContext, useEffect, useState } from "react";
import JoinSessionBtn from "./JoinSessionBtn";
import NewSessionBtn from "./NewSessionBtn";
import NewSessionModal from "./NewSessionModal";
import JoinSessionModal from "./JoinSessionModal";
import { authContext } from "../contexts/Auth";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

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
            <Container className="vh-75 d-flex align-items-center justify-content-center">
                <Col className="wid-500 ">
                    <Row className="mb-3">
                        <NewSessionBtn
                            setNewSessionModal={setNewSessionModal}
                            newSessionModal={newSessionModal}
                        />
                    </Row>
                    <Row>
                        <JoinSessionBtn
                            setJoinSessionModal={setJoinSessionModal}
                        />
                    </Row>
                    {joinSessionModal.show && (
                        <JoinSessionModal
                            setJoinSessionModal={setJoinSessionModal}
                            joinSessionModal={joinSessionModal}
                        />
                    )}
                </Col>
            </Container>
        </>
    );
}
