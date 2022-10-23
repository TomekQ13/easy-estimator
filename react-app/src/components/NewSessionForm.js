import React, { useState, useRef, useEffect } from "react";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { useCreateSession } from "../models/session";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function NewSessionForm({ handleCloseModal }) {
    const navigate = useNavigate();
    const sessionPassword = useRef();
    const sessionName = useRef();
    const [createSessionFunction, resp] = useCreateSession();
    const [sessionId, setSessionId] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (resp === undefined || sessionId === undefined) return;
        if (resp.status === 201) return navigate(`/session/${sessionId}`);
    }, [resp, sessionId, navigate]);

    function handleSubmit(event) {
        event.preventDefault();
        if (sessionName.current.value === "")
            return setErrors({ sessionName: "Session name cannot be empty" });
        const sessionId = uuid();
        setSessionId(sessionId);
        createSessionFunction({
            sessionId: sessionId,
            sessionPassword: sessionPassword.current.value,
            params: { showVotes: false, name: sessionName.current.value },
        });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSessionName" className="mb-3">
                <Form.Control
                    type="text"
                    name="sessionName"
                    placeholder="Session name"
                    autoFocus
                    ref={sessionName}
                    isInvalid={!!errors.sessionName}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                    {errors.sessionName}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formSessionPassword">
                <Form.Control
                    type="password"
                    name="sessionPassword"
                    placeholder="Session password"
                    ref={sessionPassword}
                ></Form.Control>
                <Form.Text>Password can be empty</Form.Text>
            </Form.Group>
            <Form.Group controlId="formSessionButtons">
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
