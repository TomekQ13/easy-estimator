import React, { useContext, useState } from "react";
import { authContext } from "../contexts/Auth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useCreateUser } from "../hooks/user";

export default function RegisterForm({ handleCloseModal }) {
    const [inputs, setInputs] = useState({});
    const { setUsername, setAccessToken, setRefreshToken } =
        useContext(authContext);
    const registerUser = useCreateUser();

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const username = event.target.username.value;

        const resp = await registerUser({ username });
        if (resp === undefined) return;
        setUsername(username);
        setAccessToken(resp.accessToken);
        setRefreshToken(resp.refreshToken);

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
                    required
                />
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
