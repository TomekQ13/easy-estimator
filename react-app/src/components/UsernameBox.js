import React, { useContext } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDeleteUserSession } from "../models/userSession";
import { SessionContext } from "./Session";

export default function UsernameBox({ username, userId }) {
    const { removeUser, sessionId, ws } = useContext(SessionContext);
    const [deleteUserSessionFunction] = useDeleteUserSession();

    function handleClick() {
        deleteUserSessionFunction({ sessionId, userId });
        removeUser({ userId });
        ws.send(
            JSON.stringify({
                type: "remove",
                username,
                userId,
                sessionId,
            })
        );
    }

    return (
        <NavDropdown title={username} id="username-dropdown">
            <NavDropdown.Item onClick={handleClick}>Remove</NavDropdown.Item>
            {/* <div className="username-box"></div> */}
        </NavDropdown>
    );
}
