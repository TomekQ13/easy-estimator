import React, { useState, useRef, useEffect } from "react";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { useCreateSession } from "../models/session";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function NewSessionForm({ handleCloseModal }) {
    const navigate = useNavigate();
    const sessionPassword = useRef();
    const [createSessionFunction, resp] = useCreateSession();
    const [sessionId, setSessionId] = useState(uuid());

    useEffect(() => {
        if (resp === undefined) return;
        if (resp.status === 201) return navigate(`/session/${sessionId}`);
    }, [resp, sessionId]);

    function handleSubmit(event) {
        event.preventDefault();
        const sessionId = uuid();
        console.log(createSessionFunction);
        createSessionFunction({
            sessionId: sessionId,
            sessionPassword: sessionPassword.current.value,
            params: { showVotes: false },
        });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSessionPassword">
                <Form.Control
                    type="password"
                    name="sessionPassword"
                    className="mb-3"
                    placeholder="Session password"
                    autoFocus
                    ref={sessionPassword}
                ></Form.Control>
                <div className="float-end">
                    <Button variant="primary" type="submit" className="mx-2">
                        Create session
                    </Button>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </div>
            </Form.Group>
        </Form>
    );
}
