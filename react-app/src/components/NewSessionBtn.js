import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useCreateSession } from "../models/session";
import { authContext } from "../contexts/Auth";
import uuid from "react-uuid";

export default function NewSessionBtn() {
    const navigate = useNavigate();
    const [createSessionFunction, resp] = useCreateSession({});
    const [sessionId, setSessionId] = useState();
    const {
        username,
        setRegisterModal,
        userId,
        userRegistered,
        setUserRegistered,
    } = useContext(authContext);

    useEffect(() => {
        if (resp === undefined || sessionId === undefined) return;
        if (resp.status === 201) {
            console.log("use effect on new session btn fired");
            console.log(resp);
            return navigate(`/session/${sessionId}`);
        }
    }, [resp, sessionId]);

    useEffect(() => {
        if (userRegistered === true) {
            const sessionId = uuid();
            setSessionId(sessionId);
            createSessionFunction({
                sessionId: sessionId,
                sessionPassword: "",
                hostId: userId,
                params: { showVotes: false, name: "" },
            });
            setUserRegistered(false);
        }
    }, [userRegistered]);

    function handleClick() {
        if (
            username === null ||
            username === undefined ||
            userId === null ||
            userId === undefined
        ) {
            setRegisterModal({ show: true });
        } else {
            console.log("handling new session button");
            setUserRegistered(true);
        }
    }

    return (
        <Button onClick={handleClick} className="fw-bold btn-lg">
            New session
        </Button>
    );
}
