import React, { useContext, useState } from "react";
import { authContext } from "../contexts/Auth";
import { makeApiCallFunction } from "../apiAccess/makeCall";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import ModalDialog from "react-bootstrap/esm/ModalDialog";

export default function RegisterForm({ handleCloseModal }) {
    const [inputs, setInputs] = useState({});
    const {
        setUsername,
        setAccessToken,
        setRefreshToken,
        accessToken,
        refreshToken,
    } = useContext(authContext);

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const username = event.target.username.value;

        const resp = await registerUser(username);
        if (resp === null) return;
        setUsername(username);
        setAccessToken(resp.accessToken);
        setRefreshToken(resp.refreshToken);

        handleCloseModal({ show: false });
    }

    async function registerUser(username) {
        if (username === undefined)
            throw new Error("Username is missing in registerUsername");

        const registerUserFunction = makeApiCallFunction({
            url: `/user/register`,
            body: {
                username,
            },
            method: "POST",
            accessToken,
            refreshToken,
            setAccessToken,
        });

        let resp;
        try {
            resp = await registerUserFunction();
        } catch (e) {
            console.error(e);
            console.error("There has been an error when registering the user");
            return null;
        }
        if (resp.status === 201) {
            return await resp.json();
        }
        console.error("There has been an error when registering the user");
        return null;
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
