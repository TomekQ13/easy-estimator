import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useCreateSession } from "../models/session";
import { authContext } from "../contexts/Auth";
import uuid from "react-uuid";

export default function NewSessionBtn() {
    const navigate = useNavigate();
    const [createSessionFunction, resp] = useCreateSession({});
    const [sessionId, setSessionId] = useState();
    const { userId } = useContext(authContext);

    useEffect(() => {
        if (resp === undefined || sessionId === undefined) return;
        if (resp.status === 201) {
            return navigate(`/session/${sessionId}`);
        }
    }, [resp, sessionId, navigate]);

    function handleClick() {
        const sessionId = uuid();
        setSessionId(sessionId);
        createSessionFunction({
            sessionId: sessionId,
            sessionPassword: "",
            hostId: userId,
            params: { showVotes: false, name: "" },
        });
    }

    return <Button onClick={handleClick}>New session</Button>;
}
