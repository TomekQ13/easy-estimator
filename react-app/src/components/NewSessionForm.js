import React, { useState, useContext } from "react";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { authContext } from "../contexts/Auth";
import { createSession } from "../models/session";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function NewSessionForm({ handleCloseModal }) {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const { accessToken, refreshToken, setAccessToken } =
        useContext(authContext);

    async function handleSubmit(event) {
        event.preventDefault();
        const sessionPassword = event.target.sessionPassword.value;
        const sessionId = uuid();
        try {
            const resp = await createSession({
                sessionId,
                sessionPassword,
                params: { test_param: "test_param_value" },
                accessToken,
                refreshToken,
                setAccessTokenFunction: setAccessToken,
            });
            if (resp.status === 201) {
                return navigate(`/session/${sessionId}`);
            }
        } catch (e) {
            console.error(e);
            return alert(
                "There has been an issue with creating the session. Please try again."
            );
        }
    }

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSessionPassword">
                <Form.Control
                    type="password"
                    name="sessionPassword"
                    value={inputs.sessionPassword || ""}
                    onChange={handleChange}
                    className="mb-3"
                    placeholder="Session password"
                    autoFocus
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
