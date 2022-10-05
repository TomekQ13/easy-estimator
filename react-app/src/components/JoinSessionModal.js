import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { getSession } from "../models/session";
import { authContext } from "../contexts/Auth";

export default function JoinSessionModal({
    setJoinSessionModal,
    joinSessionModal,
}) {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const { accessToken, refreshToken, setAccessToken } =
        useContext(authContext);

    function handleCloseModal() {
        setJoinSessionModal({ show: false });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const resp = await getSession({
            sessionId: event.target.sessionId.value,
            accessToken,
            refreshToken,
            setAccessTokenFunction: setAccessToken,
        });
        if (resp === null)
            return setErrors({ sessionId: "This session does not exist" });
        return navigate(`/session/${event.target.sessionId.value}`);
    }

    return (
        <Modal show={joinSessionModal.show} onHide={handleCloseModal}>
            <Modal.Header>
                <Modal.Title>Insert Session ID</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            id="sessionId"
                            name="sessionId"
                            placeholder="Session ID"
                            isInvalid={!!errors.sessionId}
                            autoFocus
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.sessionId}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="float-end">
                        <Button
                            type="submit"
                            variant="primary"
                            className="mx-2"
                        >
                            Join session
                        </Button>
                        <Button onClick={handleCloseModal} variant="secondary">
                            Close
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
