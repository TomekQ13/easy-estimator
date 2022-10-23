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
            <Container>
                <Col>
                    <Row>
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
                </Col>
            </Container>
        </>
    );
}
