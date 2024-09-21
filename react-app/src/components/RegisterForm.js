import React, { useContext, useState } from "react";
import { authContext } from "../contexts/Auth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useCreateUser } from "../hooks/user";

export default function RegisterForm({ handleCloseModal, sessionId }) {
    const [inputs, setInputs] = useState({});
    const { setUsername, setAccessToken, setRefreshToken, setUserId } =
        useContext(authContext);
    const registerUser = useCreateUser();
    const [errors, setErrors] = useState({});

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const username = event.target.username.value;

        // username validation
        if (username.trim().length > 20)
            return setErrors({
                username: "Username can be maximum 20 characters long",
            });

        const specRegex = /[^\x00-\x7F]/gm;
        if (specRegex.test() === true)
            return setErrors({
                username: "Username cannot contain any special characters",
            });

        let resp;
        try {
            resp = await registerUser({ username, sessionId });
            if (resp === undefined) return;
        } catch {
            if (window._env_.DEBUG === "true")
                console.error("There was an error while registering the user");
            return;
        }

        setUsername(username);
        setAccessToken(resp.accessToken);
        setRefreshToken(resp.refreshToken);
        setUserId(resp.userid);
        handleCloseModal({ show: false });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    name="username"
                    value={inputs.username || ""}
                    onChange={handleChange}
                    placeholder="Username"
                    isInvalid={!!errors.username}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {errors.username}
                </Form.Control.Feedback>
                <Form.Text>
                    This will be your username displayed in a session
                </Form.Text>
            </Form.Group>
            <div className="float-end">
                <Button type="submit">Continue</Button>
            </div>
        </Form>
    );
}
